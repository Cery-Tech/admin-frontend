export default {
  '*.{css,scss}': 'prettier --write',
  '*.{js,jsx,ts,tsx,md}': (filenames) => [
    `prettier --write ${filenames.join(' ')}`,
    `eslint --cache --fix ${filenames.join(' ')}`,
  ],
};
