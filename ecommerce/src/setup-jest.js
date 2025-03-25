module.exports = {
  preset: "jest-preset-angular",
  reporters: [
    "jest-fixed-default-reporter/DefaultReporter",
    "jest-fixed-default-reporter/SummaryReporter"
  ],
  roots: ["src"],
  setupFilesAfterEnv: ["<rootDir>/src/setup-jest.js"],
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)", "!**/?(*.)+(integration.spec).[jt]s?(x)"],
  moduleNameMapper: {
    "@app/(.*)": "<rootDir>/src/app/$1",
    "@assets/(.*)": "<rootDir>/src/assets/$1",
    "@core/(.*)": "<rootDir>/src/app/core/$1",
    "@src/(.*)": "<rootDir>/src/src/$1",
    "@services/(.*)": "<rootDir>/src/app/core/services/$1",
    "@helpers/(.*)": "<rootDir>/src/app/helpers/$1",
    "@shared/(.*)": "<rootDir>/src/app/shared/$1",
  },
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
    },
  },
  coverageDirectory: "./coverage",
  collectCoverageFrom: [
    "src/app/**/*.ts",
    "!<rootDir>/node_modules/",
    "!<rootDir>/test/",
    "!src/app/**/*.module.ts",
    "!src/app/core/interceptors/*",
    "!**/?(*.)+(integration.spec).[jt]s?(x)",
    "!src/app/shared/**/*"
  ],
  testTimeout: 5000
};
