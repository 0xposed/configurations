<h1 align="center">Configurations</h1>

<p align="center">Shared ESLint and Prettier presets for @0xposed projects.</p>

<p align="center">
  <a aria-label="ESLint config version" href="https://www.npmjs.com/package/@0xposed/eslint-config">
    <img alt="ESLint config version" src="https://img.shields.io/npm/v/@0xposed/eslint-config?style=flat&color=000&logoColor=000&label=eslint">
  </a>
  <a aria-label="Prettier config version" href="https://www.npmjs.com/package/@0xposed/prettier-config">
    <img alt="Prettier config version" src="https://img.shields.io/npm/v/@0xposed/prettier-config?style=flat&color=000&logoColor=000&label=prettier">
  </a>
  <a aria-label="License" href="https://github.com/0xposed/configurations/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/0xposed/configurations?style=flat&color=000&logoColor=000">
  </a>
</p>

## Packages

| Package                                                        | Presets                                                               |
| -------------------------------------------------------------- | --------------------------------------------------------------------- |
| [@0xposed/eslint-config](packages/eslint-config/README.md)     | Node/TypeScript (default), environment-neutral base, Svelte/SvelteKit |
| [@0xposed/prettier-config](packages/prettier-config/README.md) | Base formatting, Svelte + Tailwind                                    |

ES modules, Node 20.19+, ESLint 9, Prettier 3, and TypeScript 5.
These presets build on Encore's tooling and recent Svelte projects, with your
preferred formatting: single quotes, semicolons, two spaces, trailing commas,
and an 80-character print width.

## Use after publishing

```sh
pnpm add -D @0xposed/eslint-config @0xposed/prettier-config eslint@^9 prettier@^3 typescript@^5
```

`eslint.config.mjs`:

```js
export { default } from '@0xposed/eslint-config';
```

`prettier.config.mjs`:

```js
export { default } from '@0xposed/prettier-config';
```

For Svelte/SvelteKit projects, use the `/svelte` entry point in both files.
See the package READMEs for customization and monorepo setup.

Add these scripts to your project's `package.json`:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

Prettier ignores are project-specific. Add build output, `.svelte-kit`, `.turbo`,
coverage, logs, and lockfiles to your project's `.prettierignore`.

## Develop

```sh
pnpm install
pnpm check
```

There is no build step. The workspace consumes its own presets, and tests exercise
TypeScript linting, unused-import detection, Svelte 5 parsing, and formatting.

## Publish

Both packages start at `0.1.0` and set `publishConfig.access` to `public`.
Use an npm account with publishing access to the `@0xposed` scope. Both packages
include the MIT license and metadata linking to
[0xposed/configurations](https://github.com/0xposed/configurations).

```sh
pnpm check
npm pack ./packages/eslint-config --dry-run
npm pack ./packages/prettier-config --dry-run
npm login
npm publish ./packages/eslint-config --access public
npm publish ./packages/prettier-config --access public
```

For later releases, bump the changed package's version before publishing it.
The root workspace is private and is not published.
