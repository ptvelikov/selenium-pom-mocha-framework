// © 2024 Preslav Velikov
// This code is licensed under the MIT License. See LICENSE for details.

/**
The logger.js script manages logging for the entire test execution process. 
It creates a writable stream for logging messages to a file (`executionLog.txt`) and provides functions for logging standard output and errors with timestamps. 
Additionally, it includes a queuing mechanism for log entries to avoid overwhelming the system with high-frequency log writes.
The script also handles logging errors that occur during file writing and provides options for logging data with or without timestamps.
Finally, it exports the `executionLog` variable for use by other scripts.
 */
import fs from 'fs';

const executionLog = './mochawesome-report/executionLog.txt';
const logQueue = []; // Queue for log messages

// Create writable stream for the execution log file
const logStream = fs.createWriteStream(executionLog, { flags: 'a' });

// Handle errors during writing to the log file
logStream.on('error', (err) => {
  console.error(`Error writing to log file: ${err.message}`);
});

// Function to get the current timestamp
function getTimestamp() {
  return new Date().toISOString();
}

// Initial logging function
export function log(data) {
  let formattedData = typeof data === 'object' ? JSON.stringify(data, null, 2) : data.trim();
  if (formattedData) {
    const timestampedData = `${getTimestamp()} - ${formattedData}\n`;
    logStream.write(timestampedData);
    process.stdout.write(timestampedData);
  }
}

// Initial error logging function
export function logError(error) {
  const errorMessage = `${getTimestamp()} - Error: ${error.message}\n`;
  logStream.write(errorMessage);
  process.stderr.write(errorMessage);
}

// Function to add log entries to a queue
function queueLog(data) {
  logQueue.push(data);
  if (logQueue.length === 1) {
    processLogQueue();
  }
}

// Function to process the log queue with slight delays
function processLogQueue() {
  if (logQueue.length === 0) return;

  const data = logQueue.shift();
  const timestampedData = `${getTimestamp()} - ${data.trim()}\n`;
  logStream.write(timestampedData);
  process.stdout.write(timestampedData);

  setTimeout(() => {
    processLogQueue();
  }, 50); // Adjust delay as needed
}

// Functions using the queuing mechanism
export function logQueued(data) {
  queueLog(typeof data === 'object' ? JSON.stringify(data, null, 2) : data);
}

export function logErrorQueued(error) {
  queueLog(`Error: ${error.message}`);
}

// Function to log data without timestamp
export function info(...data) {
  // Join all arguments into a single string
  let formattedData = data.map(logItem => {
    // Ensure the logItem is treated as a string
    if (typeof logItem === 'object') {
      return JSON.stringify(logItem, null, 2); // Convert objects to JSON string
    }
    if (typeof logItem === 'string') {
      return logItem.trim(); // Trim if it's a string
    }
    return String(logItem); // Convert other types to string
  }).join(' ');

  if (formattedData) {
    logStream.write(formattedData + '\n');
    process.stdout.write(formattedData + '\n');
  }
}

// Export the executionLog variable
export { executionLog };