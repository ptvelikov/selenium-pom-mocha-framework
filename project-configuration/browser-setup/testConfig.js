// © 2024 Preslav Velikov
// This code is licensed under the MIT License. See LICENSE for details.

/**
The TestConfig class handles the configuration for the test environment, allowing the browser name and headless mode to be set and retrieved.
 */

class TestConfig {
    constructor(browserName = 'chrome', isHeadless = false) {
      this.browserName = browserName; // Set browser name (default: 'chrome')
      this.isHeadless = isHeadless; // Set headless mode (default: false)
    }
  
    getBrowserName() {
      return this.browserName; // Retrieve the browser name
    }
  
    getIsHeadlessValue() {
      return this.isHeadless; // Retrieve the headless mode value
    }
  }
  
  export default TestConfig;  