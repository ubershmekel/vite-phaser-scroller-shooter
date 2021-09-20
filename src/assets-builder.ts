// node.js file
// Launched from `npm run asset-build` and generates
// the `assets-generated.ts` file.

import * as fs from 'fs';
import path from 'path';
import { Loader } from 'phaser';

const banner = `//////////////////////////////////////////////////////
// GENERATED FILE - DO NOT EDIT
// GENERATED FILE - DO NOT EDIT
// GENERATED FILE - DO NOT EDIT
// See "assets-builder.ts" for more information.
//////////////////////////////////////////////////////

import 'phaser';`;

function jsNamify(fileName: string) {
  return fileName.replace(/\./, '');
}

function main() {
  const assetsDir = 'assets';
  const dst = `src/assets-generated.ts`;
  const allFiles = fs.readdirSync(assetsDir);
  const loaders = {
    '.png': 'image',
    '.mp3': 'audio',
  };
  const files = [];
  for (const fileName of allFiles) {
    const ext = path.extname(fileName);
    if (ext in loaders) {
      files.push(fileName);
    }
  }

  const out = [banner];

  out.push('\n// Url imports');
  for (const fileName of files) {
    const jsName = jsNamify(fileName);
    const line = `import ${jsName}Url from '../${assetsDir}/${fileName}';`;
    out.push(line);
  }

  // keys
  out.push('\nexport const fkey = {');
  for (const fileName of files) {
    const jsName = jsNamify(fileName);
    const line = `    ${jsName}: '${jsName}',`;
    out.push(line);
  }
  out.push('}');

  // preload function
  out.push('\nexport function preloadAll(scene: Phaser.Scene) {');
  for (const fileName of files) {
    const ext = path.extname(fileName) as keyof typeof loaders;
    const jsName = jsNamify(fileName);
    const line = `    scene.load.${loaders[ext]}(fkey.${jsName}, ${jsName}Url);`;
    out.push(line);
  }
  out.push('}');

  fs.writeFileSync(dst, out.join('\n'));
  console.log(banner);
  console.log(files);
}

main();
