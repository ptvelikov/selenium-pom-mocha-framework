// © 2024 Preslav Velikov
// This code is licensed under the MIT License. See LICENSE for details.

/**
The BrowserDriver class is responsible for setting up and managing WebDriver instances for Chrome and Firefox browsers. 
It handles browser configuration, including headless mode, and provides a method for quitting the WebDriver. 
The class is initialized with the test configuration containing the browser and headless settings.
 */

// Importing necessary modules
import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import firefox from 'selenium-webdriver/firefox.js';
import * as logger from '../logger.js';

class BrowserDriver {
  constructor(testConfig) {
    this.browserName = testConfig.getBrowserName(); // Get browser name from config
    this.isHeadless = testConfig.getIsHeadlessValue(); // Get headless mode value from config
    this.driver = this.createDriver(); // Create WebDriver based on config
  }

  async logBrowserVersion(driver) {
    try {
      const capabilities = await driver.getCapabilities();
      const browserVersion = capabilities.get('browserVersion') || capabilities.get('version');
      logger.info(`${this.browserName} version: ${browserVersion}`);
    } catch (error) {
      logger.logError(`Failed to retrieve version for ${this.browserName}: ${error.message}`);
    }
  }

  createDriver() {
    logger.info(`Creating WebDriver for browser: ${this.browserName}`);
    switch (this.browserName) {
      case 'chrome':
        return this.setupChromeDriver();
      case 'firefox':
        return this.setupFirefoxDriver();
      default:
        throw new Error(`Invalid browser name: ${this.browserName}`);
    }
  }

  setupChromeDriver() {
    logger.info('Setting up ChromeDriver...');
    const options = new chrome.Options();
    if (this.isHeadless) {
      options.addArguments('--headless');
    }
    options.addArguments('--no-sandbox', '--disable-gpu', '--window-size=1920,1080', '--enable-unsafe-swiftshader');
    const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
    this.logBrowserVersion(driver);
    logger.info('ChromeDriver created successfully.');
    driver.manage().window().maximize();
    return driver;
  }

  setupFirefoxDriver() {
    logger.info('Setting up FirefoxDriver...');
    const options = new firefox.Options();
    if (this.isHeadless) {
      options.addArguments('--headless');
    }
    options.addArguments('--no-sandbox', '--disable-gpu', '--window-size=1920,1080');
    const driver = new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
    this.logBrowserVersion(driver);
    logger.info('FirefoxDriver created successfully.');
    driver.manage().window().maximize();
    return driver;
  }

  async quit() {
    if (this.driver) {
      logger.info('Quitting WebDriver and closing the browser.');
      await this.driver.quit();
      logger.info('Browser has been closed successfully.');
    }
  }
}

export default BrowserDriver;