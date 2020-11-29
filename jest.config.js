// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // Use this configuration option to add custom reporters to Jest

  reporters: [
    [
      'jest-nyancat-reporter',
      {
        suppressErrorReporter: false,
      },
    ],
  ],
  moduleFileExtensions: ['js', 'jsx'],
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
  // setupFiles before the tests are ran
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
};
