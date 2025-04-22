import type { Config } from 'jest';

const config: Config = {
  coverageProvider: 'v8',
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};

export default config;
