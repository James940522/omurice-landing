import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const ignoredPathDirectories = new Set(['.git', '.next', 'node_modules']);
const ignoredTextDirectories = new Set([...ignoredPathDirectories, 'public']);
const checkedExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.md',
  '.mjs',
  '.ts',
  '.tsx',
  '.txt',
  '.yaml',
  '.yml',
]);

const forbiddenPatterns = [
  {
    label: 'removed Korean brand keyword',
    regex: new RegExp(['에그', '이츠'].join(''), 'i'),
  },
  {
    label: 'removed English brand keyword',
    regex: new RegExp(['egg', '\\s*', 'eats'].join(''), 'i'),
  },
];

async function collectTextFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredTextDirectories.has(entry.name)) {
        files.push(...(await collectTextFiles(fullPath)));
      }
      continue;
    }

    if (checkedExtensions.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

async function collectRepositoryPaths(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!ignoredPathDirectories.has(entry.name)) {
        files.push(path.relative(root, fullPath));
        files.push(...(await collectRepositoryPaths(fullPath)));
      }
      continue;
    }

    files.push(path.relative(root, fullPath));
  }

  return files;
}

test('SEO-facing text does not include removed brand keywords', async () => {
  const files = await collectTextFiles(root);
  const violations = [];

  for (const file of files) {
    const content = await readFile(file, 'utf8');

    for (const { label, regex } of forbiddenPatterns) {
      if (regex.test(content)) {
        violations.push(`${path.relative(root, file)} includes ${label}`);
      }
    }
  }

  assert.deepEqual(violations, []);
});

test('static asset paths do not include removed brand keywords', async () => {
  const filePaths = await collectRepositoryPaths(root);
  const violations = [];

  for (const filePath of filePaths) {
    for (const { label, regex } of forbiddenPatterns) {
      if (regex.test(filePath)) {
        violations.push(`${filePath} includes ${label}`);
      }
    }
  }

  assert.deepEqual(violations, []);
});
