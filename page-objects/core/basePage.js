// © 2024 Preslav Velikov
// This code is licensed under the MIT License. See LICENSE for details.

/**
The BasePage class provides centralized WebDriver functionality, common methods for element locators, waits, and assertions, and a cleanup method for quitting the browser. 
It should be extended by other page objects for easy access to WebDriver methods and other utilities.
 */

// Importing necessary modules
import { By, until } from 'selenium-webdriver';
import { expect } from 'chai';

class BasePage {
  static get driver() {
    return global.driver; // Access the global.driver WebDriver instance, which is already initialized in globalSetup.js
  }

  static get By() {
    return By;
  }

  static get until() {
    return until;
  }

  static get expect() {
    return expect;
  }

  static async quit() {
    if (global.driver) {
      console.log('Quitting WebDriver and closing the browser.');
      await global.driver.quit(); // Quit the WebDriver and close the browser
      console.log('Browser has been closed successfully.');
    }
  }
}

export default BasePage;