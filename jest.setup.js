// Global setup for Jest tests

// Set test timeout to 30 seconds
jest.setTimeout(30000);

// Global before each test
beforeEach(() => {
  // Reset all mocks before each test
  jest.clearAllMocks();
});

// Global after each test
afterEach(() => {
  // Clean up any resources
  jest.useRealTimers();
});

// Global after all tests
afterAll(() => {
  // Clean up any global setup
});
