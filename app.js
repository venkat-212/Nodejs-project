// app.js
const express = require('express');

import { readFile, writeFile } from 'fs/promises';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

const devicesFilePath = 'devices.json';
const logsFilePath = 'logs.txt';

// Setup and Initialization
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Device Registration
app.post('/register', async (req, res) => {
  try {
    const { deviceId, deviceType } = req.body;

    // Validate presence of deviceId and deviceType
    if (!deviceId || !deviceType) {
      return res.status(400).json({ error: 'deviceId and deviceType are required in the request body' });
    }

    // Load existing devices
    const existingDevices = await loadDevices();

    // Check for duplicate deviceId
    if (existingDevices.some(device => device.deviceId === deviceId)) {
      return res.status(400).json({ error: 'Device with the same deviceId already exists' });
    }

    // Save new device
    existingDevices.push({ deviceId, deviceType });
    await saveDevices(existingDevices);

    // Log registration
    logData(`Device registered - deviceId: ${deviceId}, deviceType: ${deviceType}`);

    res.status(201).send('Device registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Displaying Devices
app.get('/show', async (req, res) => {
  try {
    const devices = await loadDevices();
    res.json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Receiving Device Data
app.post('/data', (req) => {
  const { deviceId, data } = req.body;
  // Validate presence of deviceId and data
  if (deviceId && data) {
    // Log received data with timestamp
    logData(`Data received - deviceId: ${deviceId}, data: ${data}`);
  }
});

// Sending Commands to Devices
app.post('/command', (req, res) => {
  const { deviceId, command } = req.body;
  // Validate presence of deviceId and command
  if (deviceId && command) {
    // Log command with timestamp
    logData(`Command sent - deviceId: ${deviceId}, command: ${command}`);
    res.send('Command sent successfully');
  } else {
    res.status(400).json({ error: 'deviceId and command are required in the request body' });
  }
});

// Logging
function logData(message) {
  try {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;
    writeFile(logsFilePath, logMessage, { encoding: 'utf-8', flag: 'a' }, (err) => {
      if (err) {
        console.error('Error writing to logs.txt:', err);
      } else {
        console.log('Log written to logs.txt:', logMessage);
      }
    });
  } catch (error) {
    console.error('Error writing to logs.txt:', error);
  }
}

// Load existing devices from devices.json
// Load existing devices from devices.json
async function loadDevices() {
  try {
    const data = await readFile(devicesFilePath, 'utf-8');

    // If the file is empty, return an empty array
    if (!data.trim()) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
}

//show devices on clicking Show Button
app.get('/show', async (req, res) => {
  try {
    const devices = await loadDevices();
    res.json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Save devices to devices.json
async function saveDevices(devices) {
  await writeFile(devicesFilePath, JSON.stringify(devices, null, 2), 'utf-8');
}


app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

export default app;
