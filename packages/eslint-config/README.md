# @0xposed/eslint-config

<p align="center">
  <a aria-label="Version" href="https://www.npmjs.com/package/@0xposed/eslint-config">
    <img alt="Version" src="https://img.shields.io/npm/v/@0xposed/eslint-config?style=flat&color=000&logoColor=000">
  </a>
  <a aria-label="License" href="https://github.com/0xposed/configurations/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/0xposed/configurations?style=flat&color=000&logoColor=000">
  </a>
</p>

ESLint 9 flat configurations for JavaScript, TypeScript 5, and Svelte 5.
Requires Node 20.19+.

```sh
pnpm add -D @0xposed/eslint-config eslint@^9 typescript@^5
```

Create `eslint.config.mjs`:

```js
export { default } from '@0xposed/eslint-config';
```

## Presets

| Import                              | Environment                                    |
| ----------------------------------- | ---------------------------------------------- |
| `@0xposed/eslint-config` or `/node` | Node.js globals                                |
| `@0xposed/eslint-config/base`       | No environment globals                         |
| `@0xposed/eslint-config/svelte`     | Svelte/SvelteKit with browser and Node globals |

All presets include recommended JavaScript and TypeScript rules, Perfectionist's
natural import sorting, unused-import checks, and Prettier compatibility. Variables
and arguments starting with `_` are allowed to be unused. `no-undef` remains
enabled for JavaScript and is disabled for TypeScript; run your TypeScript or
Svelte checker for unresolved names in typed code.
No type-aware linting or `tsconfig.json` is required.

For Svelte, install `svelte@^5` in the consuming project and use:

```js
export { default } from '@0xposed/eslint-config/svelte';
```

## Customize

```js
import config from '@0xposed/eslint-config';
import sorting from '@0xposed/eslint-config/sorting';

export default [...config, sorting];
```

The optional sorting preset enables all of Perfectionist's recommended natural
sorting rules, including objects and declarations. The default only sorts imports.

In a monorepo, put the appropriate config in each package and run ESLint from
each package directory (for example, `turbo lint` or `pnpm -r lint`). ESLint 9
does not select nested package configs when you run `eslint .` at the root.
Pre-commit commands must also run ESLint from the relevant package directory.
