/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      useBabelrc: true,
      tsConfigFile: './tsconfig.jest.json',
    },
  },
};
