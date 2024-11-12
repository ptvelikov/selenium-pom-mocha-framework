// © 2024 Preslav Velikov
// This code is licensed under the MIT License. See LICENSE for details.

/**
 The googleSearchSampleTests.js script performs automated tests for Google Search using Selenium WebDriver with Mocha and Chai. 
 It contains two test cases: one to verify the page title and another to check the presence of the search input element on Google’s homepage.
 The tests use the BasePage class for common WebDriver actions and the logger module for timestamped logging.
 If an error occurs during any test, it logs the error message, and the test fails with the error thrown.
 After all tests are executed, the browser is properly closed using BasePage's quit method.
 */

import BasePage from '../page-objects/core/basePage.js';
import * as logger from '../project-configuration/logger.js';

describe('Google Search Test', () => {
  it('should navigate to Google and check the title', async () => {
    try {
      logger.info('Navigating to Google...');
      await BasePage.driver.get('https://www.google.com');

      logger.info('Waiting for the title to be available...');
      await BasePage.driver.wait(BasePage.until.titleIs('Google'), 5000);

      logger.info('Getting the page title...');
      const title = await BasePage.driver.getTitle();
      logger.info('Page Title: ' + title);
      BasePage.expect(title).to.equal('Google');
      logger.info('Title verified successfully.');
    } catch (error) {
      logger.info('Test failed: ' + error.message);
      throw error;
    }
  });

  it('should verify the presence of the search input', async () => {
    try {
      logger.info('Waiting for the search input to be present...');
      const searchInput = await BasePage.driver.wait(BasePage.until.elementLocated(BasePage.By.name('q')), 5000);
    
      logger.info('Checking if the search input is displayed...');
      const isDisplayed = await searchInput.isDisplayed();
      BasePage.expect(isDisplayed).to.be.true;
      logger.info('Search input is displayed successfully.');
    } catch (error) {
      logger.info('Test failed: ' + error.message);
      throw error;
    }
  });

  // Use BasePage's quit method for cleanup
  after(async () => {
    await BasePage.quit();
    logger.info('Browser closed after test execution.');
  });
});