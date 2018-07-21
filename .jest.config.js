// Seems this needs duplication for coverage when running coverage.
const ignorePatterns = [
  ".storybook",
  ".git",
  "/node_modules/",
  "/dist/",
]

module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ["text"],
  coveragePathIgnorePatterns: ignorePatterns,
  verbose: true,
  testPathIgnorePatterns: ignorePatterns,
}
