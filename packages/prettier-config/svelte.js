import * as svelte from 'prettier-plugin-svelte';
import * as tailwind from 'prettier-plugin-tailwindcss';

import base from './index.js';

/** @type {import('prettier').Config} */
const config = {
  ...base,
  overrides: [
    ...base.overrides,
    { files: '*.svelte', options: { parser: 'svelte' } },
  ],
  plugins: [svelte, tailwind],
  tailwindFunctions: ['cn', 'clsx', 'tv'],
};

export default config;
