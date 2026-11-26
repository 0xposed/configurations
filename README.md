<h1 align="center">Configurations</h1>

<p align="center">Shared ESLint, Prettier, and TypeScript presets for @0xposed projects.</p>

<p align="center">
  <a aria-label="ESLint config version" href="https://www.npmjs.com/package/@0xposed/eslint-config">
    <img alt="ESLint config version" src="https://img.shields.io/npm/v/@0xposed/eslint-config?style=flat&color=000&logoColor=000&label=eslint">
  </a>
  <a aria-label="Prettier config version" href="https://www.npmjs.com/package/@0xposed/prettier-config">
    <img alt="Prettier config version" src="https://img.shields.io/npm/v/@0xposed/prettier-config?style=flat&color=000&logoColor=000&label=prettier">
  </a>
  <a aria-label="TypeScript config version" href="https://www.npmjs.com/package/@0xposed/tsconfig">
    <img alt="TypeScript config version" src="https://img.shields.io/npm/v/@0xposed/tsconfig?style=flat&color=000&logoColor=000&label=typescript">
  </a>
  <a aria-label="License" href="https://github.com/0xposed/configurations/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/0xposed/configurations?style=flat&color=000000">
  </a>
</p>

## Packages

| Package                                                        | Presets                                                               |
| -------------------------------------------------------------- | --------------------------------------------------------------------- |
| [@0xposed/eslint-config](packages/eslint-config/README.md)     | Node/TypeScript (default), environment-neutral base, Svelte/SvelteKit |
| [@0xposed/prettier-config](packages/prettier-config/README.md) | Base formatting, Svelte + Tailwind                                    |
| [@0xposed/tsconfig](packages/tsconfig/README.md)               | Shared base, Node.js, and SvelteKit compiler options                  |

ES modules, Node 20.19+, ESLint 9, Prettier 3, and TypeScript 5.
These presets build on Encore's tooling and recent Svelte projects, with your
preferred formatting: single quotes, semicolons, two spaces, trailing commas,
and an 80-character print width.

## Use after publishing

```sh
pnpm add -D @0xposed/eslint-config @0xposed/prettier-config @0xposed/tsconfig eslint@^9 prettier@^3 typescript@^5
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

Both packages set `publishConfig.access` to `public`.
Use an npm account with publishing access to the `@0xposed` scope. Both packages
include the WTFPL license and metadata linking to
[0xposed/configurations](https://github.com/0xposed/configurations).

Create a release branch from `master` (for example, `release/v0.1.1`). Add a
Changeset for the package or packages being released:

```sh
pnpm changeset
pnpm check
```

Review and commit the generated Changeset markdown. When ready to release, apply
the recorded version bumps and changelogs, then commit them:

```sh
pnpm version-packages
pnpm check
git add packages .changeset
git commit -m "chore: version packages"
```

Publish the bumped packages from the release branch:

```sh
npm login
pnpm release
```

Changesets publishes only changed public packages. The root workspace stays
private. Merge release changes back to `master` after publishing.
