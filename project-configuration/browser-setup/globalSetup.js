// © 2024 Preslav Velikov
// This code is licensed under the MIT License. See LICENSE for details.

/**
The globalSetup.js script initializes global configurations for the test environment, including the test configuration (browser and headless mode) and the browser driver. 
It logs the browser settings and creates the global WebDriver instance for use across tests.
 */

// Importing necessary modules
import TestConfig from './testConfig.js';
import BrowserDriver from './browserDriver.js';
import * as logger from '../logger.js';

// Initialize global configurations
global.testConfig = new TestConfig('chrome', true); // Set browser and headless mode

// Log the values of getBrowserName() and isHeadless()
logger.info('Browser Name:', global.testConfig.getBrowserName()); // Get browser name
logger.info('Is Headless:', global.testConfig.getIsHeadlessValue()); // Get headless value

// Initialize browser driver with the test configuration
global.browserDriver = new BrowserDriver(global.testConfig);

// Set global driver
global.driver = global.browserDriver.driver; // Assign the WebDriver instance to global