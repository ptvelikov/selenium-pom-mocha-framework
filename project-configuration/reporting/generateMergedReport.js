// © 2024 Preslav Velikov
// This code is licensed under the MIT License. See LICENSE for details.

/**
The generateMergedReport.js script merges multiple Mochawesome JSON test reports into one and generates an HTML report from the merged data. 
It logs the progress and errors using the logger utility and handles the file operations for merging and generating reports.
 */

// Importing necessary modules
import { merge } from 'mochawesome-merge';
import generator from 'mochawesome-report-generator';
import { log, logError } from '../logger.js';

async function generateMergedReports() {
  // Paths to individual test reports
  const reportPaths = [
    './mochawesome-report/test-suites/googleSearchSampleTests-report/mochawesome.json',
    './mochawesome-report/test-suites/githubSampleTests-report/mochawesome.json'
    // Additional paths can be added dynamically
  ];

  // Check if there are any reports to merge
  if (reportPaths.length === 0) {
    log('No report files to merge.');
    return;
  }

  try {
    log('Starting report merge process...');

    // Merge JSON reports
    log('Merging reports...');
    const mergedReport = await merge({
      files: reportPaths,
      output: './mochawesome-report/mochawesome-merged.json',
    });
    log('Reports merged successfully.');
    console.log(mergedReport);

    // Report generation options
    const reportOptions = {
      reportTitle: 'Merged Test Report',
      reportDir: './mochawesome-report',
      inlineAssets: true,
    };

    // Generate HTML report
    log('Generating HTML report...');
    await generator.create(mergedReport, reportOptions);
    log('HTML report generated successfully.');
    console.log(reportOptions);
    log('🤖');
  } catch (error) {
    logError(new Error(`Error during report merging or generation: ${error.message}`));
  }
}

// Execute the merge process
generateMergedReports();