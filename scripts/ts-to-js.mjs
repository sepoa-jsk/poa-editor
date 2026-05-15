import ts from 'typescript';
import { readFileSync, writeFileSync, unlinkSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

function walk(dir, callback) {
  for (const f of readdirSync(dir)) {
    const full = join(dir, f);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, callback);
    else callback(full);
  }
}

function convert(tsPath) {
  const source = readFileSync(tsPath, 'utf-8');
  const out = ts.transpileModule(source, {
    fileName: tsPath,
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      removeComments: false,
      preserveValueImports: false,
      isolatedModules: true,
      useDefineForClassFields: true,
    },
  });
  const jsPath = tsPath.replace(/\.ts$/, '.js');
  writeFileSync(jsPath, out.outputText);
  unlinkSync(tsPath);
  return jsPath;
}

const roots = process.argv.slice(2);
if (roots.length === 0) {
  console.error('usage: node ts-to-js.mjs <dir1> [dir2] ...');
  process.exit(1);
}

let count = 0;
for (const root of roots) {
  walk(root, (f) => {
    if (extname(f) === '.ts' && !f.endsWith('.d.ts')) {
      try {
        convert(f);
        count++;
      } catch (e) {
        console.error(`FAIL ${f}: ${e.message}`);
      }
    }
  });
}
console.log(`converted ${count} files`);
