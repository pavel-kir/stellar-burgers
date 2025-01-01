/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@api(.*)$': '<rootDir>/src/utils/burger-api$1',
    '^@utils-types(.*)$': '<rootDir>/src/utils/types$1',
    '^@slices(.*)$': '<rootDir>/src/services/slices$1',
    '^@store(.*)$': '<rootDir>/src/services/store$1'
  }
};

export default config;
