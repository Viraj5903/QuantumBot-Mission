/* eslint-disable linebreak-style */
/* eslint-disable max-len */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {logger} = functions;

/**
 * Adds a message to Firestore under a specific user's chat.
 * This Firebase Cloud Function is triggered by an HTTPS request.
 * @param {Object} data The data object containing userId and text fields.
 * @param {Object} context The context object containing metadata for the function invocation.
 * @returns {Object} Returns a success status and the ID of the added message.
 * @throws {functions.https.HttpsError} Throws an HTTP error if required fields are missing or if an unknown error occurs.
 */
exports.addMessage = functions.https.onCall(async (data, context) => {
  try {
    logger.log("Received message request data:", data);
    // console.log("data = ", data);
    // console.log("context = ", context);

    // Validate requires fields.
    if (!data.text || !data.userId) {
      logger.log("Required fields (text or userId) are missing");
      throw new functions.https.HttpsError(
          "invalid-argument",
          "Required fields (text or userId) are missing",
      );
    }

    // Destructure the 'data' object to extract 'text' and 'userId' properties.
    const {text, userId} = data;

    // Construct message data.
    // Constructs an object 'messageData' with 'text' and 'userId' properties, along with a 'timestamp' property set to the server's timestamp.
    const messageData = {
      text,
      userId,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    };

    console.log("messageData = ", messageData);

    // Adds 'messageData' to the 'messages' subcollection under the 'chats' collection for the specified 'userId' document in Firestore, returning a reference to the newly added document.
    const messageRef = await admin
        .firestore()
        .collection("chats")
        .doc(userId)
        .collection("messages")
        .add(messageData);

    logger.log("Message added successfully, message ID:", messageRef.id);

    // Return success status and message ID.
    return {status: "success", messageId: messageRef.id};
  } catch (error) {
    logger.log("Error adding message:", error);
    throw new functions.https.HttpsError(
        "unknown",
        "An error occurred while adding the message",
        error.message,
    );
  }
});
