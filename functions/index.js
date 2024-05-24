/* eslint-disable linebreak-style */
/* eslint-disable max-len */

// Command to deploy functions: firebase deploy --only functions

// This file will be execute on the server.

// Using the require function in Node.js to import the firebase-admin module. Once imported, it initializes Firebase Admin SDK by calling the initializeApp function on the admin object, which sets up Firebase services for administrative tasks. This typically includes authentication, database management, and other backend functionalities.
const admin = require("firebase-admin");

// The initializeApp() method in the Firebase Admin SDK initializes the SDK with configuration options, enabling it to connect to Firebase services. It sets up necessary connections, such as authentication and database access, allowing the application to perform administrative tasks like managing users and accessing data. This method prepares the SDK to interact with Firebase services securely and efficiently, providing a foundation for administrative operations within the application.
admin.initializeApp();

// Import the function from the specific file.
// Importing Firebase Cloud Functions from separate files.
const {addMessage} = require("./api/addMessage");
const {updateMessage} = require("./api/updateMessage");
const {getMessage} = require("./api/getMessage");
const {getAllMessages} = require("./api/getAllMessages");
const {deleteMessage} = require("./api/deleteMessage");

// Exporting the Cloud Functions to be deployed.
exports.addMessage = addMessage;
exports.updateMessage = updateMessage;
exports.getMessage = getMessage;
exports.getAllMessages = getAllMessages;
exports.deleteMessage = deleteMessage;

// Export the addMessage function for deployment.
// exports.addMessage = addMessage;
