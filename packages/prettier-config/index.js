/** @type {import('prettier').Config} */
const config = {
  bracketSameLine: false,
  overrides: [{ files: ['*.svg', '*.xml'], options: { parser: 'html' } }],
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};

export default config;
