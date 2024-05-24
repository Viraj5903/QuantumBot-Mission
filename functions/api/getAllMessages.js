/* eslint-disable max-len */
/* eslint linebreak-style: ["error", "windows"]*/

// Importing required modules.
const functions = require("firebase-functions"); // Importing Firebase Functions module.
const admin = require("firebase-admin"); // Importing Firebase Admin module.

// Defining Firebase Cloud Function named getAllMessages.
/**
 * Retrieves all messages associated with a specified user from Firestore.
 * This Firebase Cloud Function is triggered by an HTTPS request.
 * @param {Object} data The data object containing userId field.
 * @param {Object} context The context object containing metadata for the function invocation.
 * @returns {Object} Returns a success status and an array of messages data associated with the user.
 * @throws {functions.https.HttpsError} Throws an HTTP error if userId is missing or if an unknown error occurs.
 */
exports.getAllMessages = functions.https.onCall(async (data, context) => {
  try {
    // console.log("data = ", data); // Commented out logging the input data received by the function.

    // Checking if the userId is missing in the input data.
    if (!data.userId) {
      // Throwing an HTTP error if userId is missing, indicating an invalid argument.
      throw new functions.https.HttpsError("invalid-argument", "Missing userId");
    }

    // Extracting the userId from the input data.
    const {userId} = data;

    // Creating a reference to the Firestore collection of chats for the specified user.
    const userRef = admin.firestore().collection("chats").doc(userId);

    // Retrieving a snapshot of the user's document from Firestore.
    const userSnap = await userRef.get();

    // Checking whether the document with userId exist or not.
    // Checking if the user document does not exist and has no subcollections that means document doesn't exist for the specific userId.
    if (!userSnap.exists && ((await userRef.listCollections()).length === 0)) {
      // Throwing an HTTP error indicating that the user with the specified userId is not found.
      throw new functions.https.HttpsError("not-found", `User with userId = ${userId} is not present.`);
    }

    // Retrieving a snapshot of the messages subcollection for the user from Firestore.
    const messagesSnapshot = await userRef.collection("messages").get();

    // Mapping the documents in the messages subcollection to extract their data.
    const messages = messagesSnapshot.docs.map((doc) => doc.data());

    // Returning a success status along with the messages data.
    return {status: "success", messages: messages};
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
