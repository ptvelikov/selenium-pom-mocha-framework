# Selenium Page Object Model with Mocha and Chai

This project is a robust testing framework built on Selenium WebDriver, utilizing the Page Object Model (POM) design pattern with Mocha as the testing framework and Chai for assertions. Detailed, visually appealing reports are generated using Mochawesome. The framework is optimized for end-to-end (E2E) and integration testing of web applications.

## Table of Contents
1. [Project Structure](#project-structure)
2. [Requirements](#requirements)
3. [Installation](#installation)
4. [Dependencies](#dependencies)
5. [Setup](#setup)
6. [Running Tests](#running-tests)
7. [Merging Reports](#merging-reports)
8. [Reporting](#reporting)
9. [Contributing](#contributing)
10. [Writing Tests](#writing-tests)
11. [Attribution](#attribution)
12. [License](#license)

## Project Structure

├── mochawesome-report/                   # Folder containing individual and merged reports
│   └── test-suites/                      # Contains subfolders for specific test report outputs
│
├── node_modules/                         # Project dependencies
│
├── page-objects/                         # Page Object Model classes
│   ├── core/                    
│       └── basePage.js                   # Base class with common actions
│
├── project-configuration/
│       ├── browser-setup/                    
│           ├── browserDriver.js          # Manages WebDriver for Chrome and Firefox with headless support, browser sessions and cleanup
|           ├── globalSetup.js            # Initializes test configurations, logs browser settings, and sets up a global WebDriver instance for all tests
|           └── testConfig.js             # Manages test environment settings, including browser name and headless mode options
│       ├── reporting/
|           └── generateMergedReport.js   # Merges and generates HTML reports
│   ├── executor.js                       # Executes test-suites with Mocha, spawns processes per test, logs with timestamps, generates reports, and quits the browser driver
│   └── logger.js                         # Handles logging test execution, writes to executionLog.txt with timestamps
│
├── test-suites/                          # Contains individual test files
├── .env                                  # Storing environment variables for test configuration
├── .env.example                          # Template for environment variables used in the test configuration
├── .gitignore                            # Specifies files and folders to be excluded from version control
├── LICENSE                               # Contains the licensing information for the project
├── package.json                          # Manages project dependencies, scripts, and metadata for the Node.js project
├── package-lock.json                     # Locks the project dependencies to specific versions to ensure consistent installations across environments
├── README.md                             # Provides an overview of the project, including setup instructions, usage, and relevant details for developers and contributors
└── .git/                                 # Contains Git version control data and configuration for the project repository

## Requirements

- Node.js (v22.11.0 or later)
- npm (v10.9.0 or later)
- Google Chrome or other WebDriver-compatible browsers
- Git

## Installation

1. Clone the repository:
   git clone https://github.com/your-username/selenium-pom-mocha-framework.git
   cd selenium-pom-mocha-framework

2. Install the required dependencies:
   npm install

## Dependencies

1. mocha: Test framework.
2. chai: Assertion library.
3. selenium-webdriver: Core Selenium library.
4. webdriver-manager: Manages driver binaries.
5. chai: Assertion library.
6. dotenv: Manages environment variables.

## Setup

1. The framework uses WebDriverManager to automatically manage browser driver versions. Check project-configuration/browser-setup/globalSetup.js for more information.

2. Configuration Files

executor.js: Executes test files using Mocha, logs output with timestamps, generates Mochawesome reports, and handles errors and browser driver quitting.
logger.js: Manages logging for test execution, writing to executionLog.txt with timestamps, queuing log entries, handling errors, and providing options for timestamped or non-timestamped logs.

2.1. browser-setup:
2.1.1. browserDriver.js: Manages WebDriver setup, headless configuration, and quitting for Chrome and Firefox based on test settings.
2.1.2. globalSetup.js: Initializes global test configurations, logs settings, and creates a global WebDriver instance. 
2.1.3. testConfig.js: Handles test environment configuration, setting and retrieving browser name and headless mode.

2.2. reporting:
2.2.1. generateMergedReport.js: Merges Mochawesome JSON reports and generates an HTML report, logging progress and errors.

3. Customizing the Tests

New test files can be added to the test-suites/ folder. Test files should follow the pattern test-suites/{name}SampleTests.js. The tests should use Mocha syntax and Chai assertions.

## Running Tests

General: To run all test cases and to generate reports: npm run test-all ; npm run merge-reports

There are two main ways to run tests:

1. Run a Specific Test: To run an individual test file the following command should be used:

npm test test-suites/githubSampleTests.js

2. Run All Tests: To execute all test files in the test-suites/ folder the following command should be used:

npm run test-all

This will spawn a process for each test file and generate a Mochawesome report for each test.

## Merging Reports

After running all tests, the individual Mochawesome JSON reports can be merged into one and final HTML report to be generated. Run the following command:

npm run merge-reports

This will merge all test reports from the mochawesome-report/test-suites/ directory and generate a single HTML report located in mochawesome-report/

## Reporting

The Mochawesome reporter generates reports in a JSON format. Once tests are run, the reports are saved in the mochawesome-report/ directory.
The generateMergedReport.js script allows merging multiple Mochawesome JSON reports into one and generate an HTML report.

## Contributing

Please fork the repository and create a pull request for any feature improvements or bug fixes.

## Writing Tests

Tests are organized in the test-suites/ directory. Utilize the BasePage class for common Selenium actions. Tests can be structured as shown below:

describe('Sample Test', () => {
  it('should do something', async () => {
    // Test code here
  });
});

## License

This project is licensed under the MIT License, which permits free use, modification, and distribution of the code. However, attribution is required. 
For more details, see the [LICENSE](./LICENSE) file.

## Attribution

This project was created by Preslav Velikov (ptvelikov). Feel free to use and modify it, but please credit the original author.

## Author

Preslav Velikov
https://github.com/ptvelikov