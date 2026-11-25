import nodeConfig from '@0xposed/eslint-config';
import svelteConfig from '@0xposed/eslint-config/svelte';
import prettierConfig from '@0xposed/prettier-config';
import sveltePrettier from '@0xposed/prettier-config/svelte';
import { ESLint } from 'eslint';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { format } from 'prettier';

test('Node preset lints TypeScript and detects unused imports', async () => {
  const eslint = new ESLint({
    overrideConfig: nodeConfig,
    overrideConfigFile: true,
  });
  const [valid] = await eslint.lintText('export const value: number = 1\n', {
    filePath: 'example.ts',
  });
  assert.equal(valid.errorCount, 0);
  const [invalid] = await eslint.lintText("import fs from 'node:fs'\n", {
    filePath: 'example.ts',
  });
  assert.ok(
    invalid.messages.some(
      ({ ruleId }) => ruleId === 'unused-imports/no-unused-imports',
    ),
  );
  assert.equal(await eslint.isPathIgnored('dist/example.js'), true);
});

test('Svelte preset parses TypeScript and Svelte 5 runes', async () => {
  const eslint = new ESLint({
    overrideConfig: svelteConfig,
    overrideConfigFile: true,
  });
  const [result] = await eslint.lintText(
    '<script lang="ts">let count: number = $state(0);</script><button onclick={() => count++}>{count}</button>',
    { filePath: 'Example.svelte' },
  );
  assert.equal(result.errorCount, 0, JSON.stringify(result.messages));
});

test('Prettier base applies the shared style', async () => {
  const output = await format('export const value = "hello";', {
    ...prettierConfig,
    parser: 'typescript',
  });
  assert.equal(output, "export const value = 'hello';\n");
  const multiline = await format(
    'export const values = { first: 1, second: 2 };',
    {
      ...prettierConfig,
      parser: 'typescript',
      printWidth: 20,
    },
  );
  assert.match(multiline, /second: 2,\n/);
});

test('undefined names are checked in JavaScript but delegated to TypeScript', async () => {
  const eslint = new ESLint({
    overrideConfig: nodeConfig,
    overrideConfigFile: true,
  });
  for (const extension of ['js', 'ts']) {
    const [result] = await eslint.lintText('missingFunction();', {
      filePath: `example.${extension}`,
    });
    assert.equal(
      result.messages.some(({ ruleId }) => ruleId === 'no-undef'),
      extension === 'js',
    );
  }
});

test('Tailwind sorting includes class helpers', async () => {
  for (const helper of ['cn', 'clsx', 'tv']) {
    const output = await format(`${helper}('p-4 flex');`, {
      ...sveltePrettier,
      parser: 'typescript',
    });
    assert.equal(output, `${helper}('flex p-4');\n`);
  }
});

test('Svelte formatting resolves bundled plugins and sorts Tailwind classes', async () => {
  const output = await format(
    '<script lang="ts">let name: string="world";</script><h1 class="p-4 flex">{name}</h1>',
    { ...sveltePrettier, parser: 'svelte' },
  );
  assert.match(output, /let name: string = 'world'/);
  assert.match(output, /class="flex p-4"/);
  assert.equal(
    await format(output, { ...sveltePrettier, parser: 'svelte' }),
    output,
  );
});
