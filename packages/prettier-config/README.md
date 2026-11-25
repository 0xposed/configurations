<h1 align="center">@0xposed/prettier-config</h1>

<p align="center">Shared Prettier settings for JavaScript, TypeScript, Svelte, and Tailwind.</p>

<p align="center">
  <a aria-label="Version" href="https://www.npmjs.com/package/@0xposed/prettier-config">
    <img alt="Version" src="https://img.shields.io/npm/v/@0xposed/prettier-config?style=flat&color=000&logoColor=000">
  </a>
  <a aria-label="License" href="https://github.com/0xposed/configurations/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/0xposed/configurations?style=flat&color=000000">
  </a>
</p>

Shared Prettier 3 settings. Requires Node 20.19+.

```sh
pnpm add -D @0xposed/prettier-config prettier@^3
```

Create `prettier.config.mjs`:

```js
export { default } from '@0xposed/prettier-config';
```

Single quotes, semicolons, two spaces, trailing commas, and an 80-character print
width. Multiline markup closing brackets go on a separate line. SVG and XML use
Prettier's HTML parser.

## Svelte and Tailwind

```js
export { default } from '@0xposed/prettier-config/svelte';
```

This preset includes Svelte formatting and Tailwind class sorting. Plugins are
dependencies of this package and loaded directly, so consuming projects do not
need to install or resolve them separately. Tailwind runs last and also sorts
classes inside `cn`, `clsx`, and `tv` calls.

For Tailwind 4, point to your project's CSS entry point to include custom utilities:

```js
import config from '@0xposed/prettier-config/svelte';

export default {
  ...config,
  tailwindStylesheet: './src/app.css',
};
```

Other settings can be overridden in the same way. Keep generated output and
lockfile exclusions in your project's `.prettierignore`; ignore patterns are not
part of a shareable Prettier config.
