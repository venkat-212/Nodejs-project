# IoT Device Management System

This is a simple Node.js application with Express.js for managing IoT devices. The system supports device registration, displaying registered devices, receiving data from devices, sending commands to devices, and maintaining logs of activities.

## Setup Instructions in Visual Studio Code

### Prerequisites

Make sure you have the following installed on your system:

- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)


### Installation

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>

Open Visual Studio Code and navigate to the project directory:	
	cd <project-directory>
	code .

Open the integrated terminal in Visual Studio Code (Ctrl + `) and install the dependencies:
npm install
Configuration
Open the config.json file in the root directory.

Ensure that the server is configured to run on the desired port. The default is set to 3000:
{
  "port": 3000
}



Running the Application:
In the integrated terminal of Visual Studio Code, start the server:


npm start
This will start the Express.js server.

Open your web browser and navigate to http://localhost:3000 (or the configured port).

Usage:
Device Registration:
To register a new device, fill in the device ID and device type in the registration form and click "Register Device".

Displaying Registered Devices:
Click the "Show Registered Devices" button to display a list of registered devices.

Sending Data:
Use the "Send Data" form to send data from a registered device. Provide the device ID and data before clicking "Send Data".

Sending Commands:
Use the "Send Command" form to send commands to registered devices. Enter the device ID and command before clicking "Send Command".

Additional Notes:
The application uses file storage (devices.json) to persist registered devices. Make sure the application has write permissions in the project directory.
Logs of activities are stored in logs.txt
