/* eslint-disable max-len */
/* eslint linebreak-style: ["error", "windows"]*/

// Import the required Firebase Functions and Admin SDK modules.
const functions = require("firebase-functions"); // Importing Firebase Functions module.
const admin = require("firebase-admin"); // Importing Firebase Admin module.

// Define the Cloud Function named 'updateMessage' which is triggered by an HTTPS request.
/**
 * Updates a message in Firestore with new text.
 * This Firebase Cloud Function is triggered by an HTTPS request.
 * @param {Object} data The data object containing userId, text, and messageId.
 * @param {Object} context The context object containing metadata for the function invocation.
 * @returns {Object} Returns a success status and the updated message data.
 * @throws {functions.https.HttpsError} Throws an HTTP error if required fields are missing or if an unknown error occurs.
 */
exports.updateMessage = functions.https.onCall(async (data, context) => {
  try {
    // console.log("data = ", data); // Commented out logging the input data received by the function.

    // Checking if required fields are missing in the incoming data.
    if (!data.userId || !data.text || !data.messageId) {
      // Throwing an HTTP error if any required field is missing, indicating an invalid argument.
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Required fields are missing",
      );
    }

    // Destructuring the incoming data object to extract userId, text, and messageId.
    const {userId, text, messageId} = data;

    // Get a reference to the specific message document in Firestore.
    const messageRef = await admin.firestore()
        .collection("chats").doc(userId)
        .collection("messages").doc(messageId);

    // Retrieve the snapshot of the message document.
    const messageSnapshot = await messageRef.get();

    // Check if the message exists.
    if (!messageSnapshot.exists) {
      console.log("Message not found!");
      // Throw an HTTP error if the message doesn't exist, indicating a not-found.
      throw new functions.https.HttpsError(
          "not-found",
          "Message not found",
      );
    }

    // Use update() method to update only the specified fields.
    // Update the message document in Firestore with the new data.
    await messageRef.update({
      text,
    });

    // Return success status along with the updated message data.
    return {status: "success", message: (await messageRef.get()).data()};
  } catch (error) {
    // Logging any errors that occur during execution.
    console.log(error);

    // Logging the error message using Firebase functions logger.
    functions.logger.log("Error Message: ", error);

    // Throwing an HTTP error indicating that an unknown error occurred.
    throw new functions.https.HttpsError(
        "unknown",
        "An error occurred while adding the message",
        error, // Including the error object in the response for debugging purposes.
    );
  }
});
