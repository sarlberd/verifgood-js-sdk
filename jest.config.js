// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/configuration

module.exports = {
  // The test environment that will be used for testing
  testEnvironment: 'node',
  
  // The glob patterns Jest uses to detect test files
  testMatch: ['**/*.test.[jt]s?(x)'],
  
  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['/node_modules/'],
  
  // The root directory that Jest should scan for tests and modules within
  roots: ['<rootDir>'],
  
  // A map from regular expressions to module paths or to module names
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  
  // An array of file extensions your modules use
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        // Use the test-specific TypeScript configuration
        tsconfig: 'tsconfig.test.json',
        // Disable type checking in watch mode for better performance
        diagnostics: false,
      },
    ],
  },
  
  // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
  transformIgnorePatterns: ['/node_modules/'],
  
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  
  // Reset the module registry before running each individual test
  resetModules: true,
  
  // Reset the mock state before each test
  resetMocks: true,
  
  // Restore mock state between tests
  restoreMocks: true,
  
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: false, // Disable coverage for faster tests
  
  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',
  
  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/'],
  
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: 'v8',
  
  // Make calling deprecated APIs throw helpful error messages
  errorOnDeprecated: true,
  
  // Force exit the test runner after all tests have completed
  forceExit: true,
  
  // The maximum amount of workers used to run your tests. Can be specified as % or a number.
  maxWorkers: '50%',
  
  // The number of seconds after which a test is considered as slow and reported as such in the results
  slowTestThreshold: 5,
  
  // The number of seconds after which a test times out
  testTimeout: 30000, // 30 seconds
  
  // Run tests with the specified reporter
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'test-results',
      outputName: 'junit.xml',
    }],
  ],
  
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // The glob patterns Jest uses to detect test files
  // This is a more specific pattern that might help with test discovery
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
    '**/*.test.[jt]s?(x)',
  ],
  
  // Whether to use watchman for file crawling
  watchman: false,
};