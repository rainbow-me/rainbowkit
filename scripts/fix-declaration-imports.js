import { existsSync } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

// TypeScript preserves source specifiers in declarations. Published ESM types
// need explicit filenames, including /index.js for directory imports.
export async function fixDeclarationImports(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await fixDeclarationImports(file);
      continue;
    }
    if (!entry.name.endsWith('.d.ts')) continue;

    const text = await readFile(file, 'utf8');
    const source = ts.createSourceFile(
      file,
      text,
      ts.ScriptTarget.Latest,
      true,
    );
    const edits = [];
    const rewrite = (literal) => {
      if (!literal || !ts.isStringLiteral(literal)) return;
      const value = literal.text;
      if (!/^\.\.?\//.test(value) || /\.[cm]?js$/.test(value)) return;
      const target = path.resolve(path.dirname(file), value);
      const suffix = existsSync(`${target}.d.ts`)
        ? '.js'
        : existsSync(path.join(target, 'index.d.ts'))
          ? '/index.js'
          : undefined;
      if (!suffix) return;
      edits.push({
        start: literal.getStart(source),
        end: literal.getEnd(),
        replacement: JSON.stringify(value + suffix),
      });
    };
    const visit = (node) => {
      if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
        rewrite(node.moduleSpecifier);
      } else if (
        ts.isImportTypeNode(node) &&
        ts.isLiteralTypeNode(node.argument)
      ) {
        rewrite(node.argument.literal);
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
    if (edits.length === 0) continue;

    let output = text;
    for (const edit of edits.sort((a, b) => b.start - a.start)) {
      output =
        output.slice(0, edit.start) + edit.replacement + output.slice(edit.end);
    }
    await writeFile(file, output);
  }
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href
) {
  await fixDeclarationImports(process.argv[2] ?? 'dist');
}
