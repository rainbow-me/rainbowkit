import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import ts from 'typescript';
import { fixDeclarationImports } from './fix-declaration-imports.js';

for (const mode of ['Node16', 'NodeNext']) {
  test(`emitted declarations resolve and retain types with ${mode}`, async (t) => {
    const root = await mkdtemp(path.join(os.tmpdir(), 'rainbowkit-types-'));
    t.after(() => rm(root, { recursive: true, force: true }));
    await mkdir(path.join(root, 'src', 'models'), { recursive: true });
    await writeFile(path.join(root, 'package.json'), '{"type":"module"}');
    await writeFile(
      path.join(root, 'src', 'types.ts'),
      'export interface Value { name: string }',
    );
    await writeFile(
      path.join(root, 'src', 'models', 'index.ts'),
      'export interface Model { id: number }',
    );
    await writeFile(
      path.join(root, 'src', 'index.ts'),
      `import type { Value } from './types';
export type { Model } from './models';
export type Item = Value;
export type Dynamic = import('./types').Value;
export type Explicit = import('./types.js').Value;
export type Literal = './types';`,
    );
    const declarationOptions = {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      declaration: true,
      emitDeclarationOnly: true,
      outDir: path.join(root, 'dist'),
      rootDir: path.join(root, 'src'),
      types: [],
    };
    const program = ts.createProgram(
      [path.join(root, 'src', 'index.ts')],
      declarationOptions,
    );
    assert.equal(program.emit().emitSkipped, false);
    const consumer = path.join(root, 'consumer.mts');
    await writeFile(
      consumer,
      `import type { Item, Model, Dynamic, Explicit, Literal } from './dist/index.js';
const value: Item = { name: 'hello' };
const model: Model = { id: 1 };
const dynamic: Dynamic = value;
const explicit: Explicit = value;
const literal: Literal = './types';
// @ts-expect-error exported fields must not become any
const bad: Item = { name: 123 };
// @ts-expect-error directory re-exports must retain their types
const badModel: Model = { id: 'wrong' };`,
    );
    const options = {
      module: ts.ModuleKind[mode],
      moduleResolution: ts.ModuleResolutionKind[mode],
      target: ts.ScriptTarget.ES2020,
      strict: true,
      noEmit: true,
      types: [],
    };
    const diagnostics = () =>
      ts.getPreEmitDiagnostics(ts.createProgram([consumer], options));
    assert.ok(diagnostics().some(({ code }) => code === 2834 || code === 2835));
    await fixDeclarationImports(path.join(root, 'dist'));
    assert.deepEqual(diagnostics(), []);
    const output = await readFile(
      path.join(root, 'dist', 'index.d.ts'),
      'utf8',
    );
    assert.match(output, /models\/index\.js/);
    assert.match(output, /import\("\.\/types\.js"\)/);
    assert.match(output, /Literal = '\.\/types'/);
    await fixDeclarationImports(path.join(root, 'dist'));
    assert.equal(
      await readFile(path.join(root, 'dist', 'index.d.ts'), 'utf8'),
      output,
    );
  });
}
