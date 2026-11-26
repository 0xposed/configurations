<h1 align="center">@0xposed/tsconfig</h1>

<p align="center">Shared TypeScript compiler options for Node.js and SvelteKit projects.</p>

<p align="center">
  <a aria-label="Version" href="https://www.npmjs.com/package/@0xposed/tsconfig">
    <img alt="Version" src="https://img.shields.io/npm/v/@0xposed/tsconfig?style=flat&color=000&logoColor=000">
  </a>
  <a aria-label="License" href="https://github.com/0xposed/configurations/blob/master/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/0xposed/configurations?style=flat&color=000000">
  </a>
</p>

TypeScript 5 configurations based on the patterns in my Node.js and SvelteKit
projects.

```sh
pnpm add -D @0xposed/tsconfig typescript@^5
```

## Presets

| Preset                         | Use                                            |
| ------------------------------ | ---------------------------------------------- |
| `@0xposed/tsconfig` or `/base` | Strict, shared compiler options                |
| `@0xposed/tsconfig/node`       | Node.js projects using native ES modules       |
| `@0xposed/tsconfig/svelte`     | SvelteKit projects using generated Kit options |

### Node.js

Create `tsconfig.json`:

```json
{
  "extends": "@0xposed/tsconfig/node",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*.ts"]
}
```

The preset leaves `include`, `rootDir`, `outDir`, and emission settings to each
project.

### SvelteKit

TypeScript 5 supports multiple `extends` entries. Keep SvelteKit's generated
configuration first so the shared preset supplies common strict settings:

```json
{
  "extends": ["./.svelte-kit/tsconfig.json", "@0xposed/tsconfig/svelte"],
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true
  }
}
```

The Svelte preset enables JavaScript checking by default, matching most of my
SvelteKit projects. Set `allowJs` or `checkJs` to `false` if a project needs to
opt out. Keep aliases and generated directories in the SvelteKit-generated
configuration.

All presets are ordinary JSON configs and can be extended with project-specific
compiler options.
