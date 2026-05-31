import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const revalidate = 86400;

const CSV_RELATIVE_PATH = 'public/asset/csv/omurice_kakao_stores_clean.csv';
const CACHE_SECONDS = 60 * 60 * 24;

function parseCsvLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      current += '"';
      i += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
      continue;
    }

    current += char;
  }

  values.push(current.trim());
  return values;
}

export async function GET() {
  try {
    const csvPath = path.join(process.cwd(), CSV_RELATIVE_PATH);
    const csvText = await fs.readFile(csvPath, 'utf-8');
    const lines = csvText
      .replace(/^\uFEFF/, '')
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    const dataLines = lines.slice(1);
    const maxStoreCode = dataLines.reduce((maxCode, line) => {
      const storeCode = Number(parseCsvLine(line)[0]);
      return Number.isFinite(storeCode) ? Math.max(maxCode, storeCode) : maxCode;
    }, 0);

    return NextResponse.json(
      {
        total: dataLines.length,
        maxStoreCode,
      },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 7}`,
        },
      }
    );
  } catch (error) {
    console.error('[stores/count] Unexpected error:', error);
    return NextResponse.json({ error: 'Failed to count stores' }, { status: 500 });
  }
}
