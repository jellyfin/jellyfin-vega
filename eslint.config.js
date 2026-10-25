const js = require('@eslint/js');
const reactNative = require('@react-native/eslint-config/flat');
const tsParser = require('@typescript-eslint/parser');
const jsonParser = require('jsonc-eslint-parser');

module.exports = [
	{
		ignores: ['babel.config.js', 'metro.config.js', 'package-lock.json', 'build/**', 'dist/**'],
	},
	js.configs.recommended,
	...reactNative,
	{
		files: ['**/*.ts', '**/*.tsx'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.json',
				tsconfigRootDir: __dirname,
			},
		},
	},
	{
		files: ['package.json', 'kepler-compatibility.json'],
		languageOptions: {
			parser: jsonParser,
		},
	},
];
