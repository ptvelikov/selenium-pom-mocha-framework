// © 2024 Preslav Velikov
// This code is licensed under the MIT License. See LICENSE for details.

/**
 The githubSampleTests.js script performs automated tests for GitHub using Selenium WebDriver with Mocha and Chai.
 It contains two test cases: one to verify the page title and another to check the presence of the "Sign in" button on GitHub's homepage.
 The tests use the BasePage class for common WebDriver actions and the logger module for timestamped logging.
 If an error occurs during any test, it logs the error message, and the test fails with the error thrown.
 After all tests are executed, the browser is properly closed using BasePage's quit method.
 */

 import BasePage from '../page-objects/core/basePage.js';
 import * as logger from '../project-configuration/logger.js';
 
 describe('GitHub Homepage Test', () => {
   it('should navigate to GitHub and check the title', async () => {
     try {
       logger.info('Navigating to GitHub...');
       await BasePage.driver.get('https://github.com');
 
       logger.info('Waiting for the title to be available...');
       await BasePage.driver.wait(BasePage.until.titleContains('GitHub'), 5000); // Check if the title contains 'GitHub'

       logger.info('Getting the page title...');
       const title = await BasePage.driver.getTitle();
       logger.info('Page Title: ' + title);
       BasePage.expect(title).to.equal('GitHub · Build and ship software on a single, collaborative platform · GitHub');
       logger.info('Title verified successfully.');
     } catch (error) {
       logger.info('Test failed: ' + error.message);
       throw error;
     }
   });
 
   it('should verify the presence of the "Sign in" button', async () => {
     try {
       logger.info('Waiting for the "Sign in" button to be present...');
       const signInButton = await BasePage.driver.wait(BasePage.until.elementLocated(BasePage.By.linkText('Sign in')), 5000);
     
       logger.info('Checking if the "Sign in" button is displayed...');
       const isDisplayed = await signInButton.isDisplayed();
       BasePage.expect(isDisplayed).to.be.true;
       logger.info('"Sign in" button is displayed successfully.');
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