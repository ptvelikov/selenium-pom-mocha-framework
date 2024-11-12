// © 2024 Preslav Velikov
// This code is licensed under the MIT License. See LICENSE for details.

/**
The executor.js script executes all test files in the 'test-suites' directory using Mocha. 
It spawns a child (testProcess) process for each test file, logs the output using a timestamped logger, and generates Mochawesome reports for each test execution. 
Errors are handled and logged, and the browser driver is quit after test execution.
 */

import { spawn } from 'child_process';
import fs from 'fs';
import { log, logError, executionLog } from './logger.js'; // Import executionLog

const testFiles = fs.readdirSync('test-suites').filter(file => file.endsWith('.js'));

async function runTestWithMochawesomeReporter(testFile) {
    const testFileName = testFile.replace('.js', ''); // Remove the file extension
  
    // Create writable stream to the execution log file
    const logStream = fs.createWriteStream(executionLog, { flags: 'a' });
  
    // Handle errors during writing to the log file
    logStream.on('error', (err) => {
      console.error(`Error writing to log file: ${err.message}`);
    });
  
    // Spawn the child (testProcess) process using shell
    const testProcess = spawn('mocha', ['--file', './project-configuration/browser-setup/globalSetup.js', testFile, '--timeout', '60000', '--reporter', 'mochawesome', '--reporter-options', `reportDir=./mochawesome-report/${testFileName}-report`], {
      stdio: ['inherit', 'pipe', 'pipe'], // Redirect stdout and stderr to pipes
      shell: true,
      cwd: '.' // Set the current working directory for the spawned process
    });
  
    // Intercept stdout and stderr to log with timestamp
    testProcess.stdout.on('data', data => {
      const output = data.toString();
      output.split('\n').forEach(line => {
        if (line) {
          log(line); // Use your log function to add timestamp
        }
      });
    });
  
    testProcess.stderr.on('data', data => {
      const output = data.toString();
      output.split('\n').forEach(line => {
        if (line) {
          logError(new Error(line)); // Log errors with timestamp
        }
      });
    });
  
    return new Promise((resolve, reject) => {
      testProcess.on('close', async code => {
        if (code !== 0) {
          console.error(`Test failed with code ${code}`);
        }

        // Ensure the browser driver is quit after test completion
      if (global.browserDriver) {
        await global.browserDriver.quit();
        log('Browser closed after test execution');
      }
        resolve();
      });
    });
  }  

// Execute each test file
async function executeAllTests() {
    log('🚀');
    log('Starting test execution...'); // Log message to indicate test execution has started

  for (const testFile of testFiles) {
    if (testFile === 'PageObjectTemplate.js') {
      log(`Skipping test file: ${testFile}\n`);
      continue;
    }

    log(`Executing test file: ${testFile}\n`);
    try {
      await runTestWithMochawesomeReporter(`test-suites/${testFile}`);
    } catch (error) {
      logError(new Error(`Error executing test: ${error.message}`));
    }
  }
}

// Execute all the tests
executeAllTests();