import assert from 'node:assert/strict';
import { open, stat } from 'node:fs/promises';
import test from 'node:test';

const assets = [
  {
    name: 'desktop',
    path: 'public/new-asset/intro-video/pc.mp4',
    expectedSize: 3_356_416,
  },
  {
    name: 'mobile',
    path: 'public/new-asset/intro-video/mo.mp4',
    expectedSize: 3_930_555,
  },
];

const inspectAsset = async (path) => {
  try {
    const fileStat = await stat(path);
    const file = await open(path, 'r');
    const header = Buffer.alloc(12);
    await file.read(header, 0, header.length, 0);
    await file.close();

    return {
      size: fileStat.size,
      fileType: header.subarray(4, 8).toString('ascii'),
    };
  } catch {
    return null;
  }
};

for (const asset of assets) {
  test(`${asset.name} intro video is stored as the supplied MP4`, async () => {
    const inspected = await inspectAsset(asset.path);

    assert.notEqual(inspected, null);
    assert.equal(inspected.size, asset.expectedSize);
    assert.equal(inspected.fileType, 'ftyp');
  });
}
