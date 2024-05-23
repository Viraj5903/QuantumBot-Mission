# QuantumChat Bot

## Overview and Purpose:
QuantumChat Bot Functions contain the backend logic for handling real-time communication and collaboration among individuals and teams. These Firebase Cloud Functions provide the necessary API endpoints to support the core functionalities of QuantumChat Bot.

## Installation Instructions:
To set up QuantumChat Bot, follow these steps:

1. **Clone the repository to your local machine**.
    - To clone run: 
      ```
      git clone https://github.com/Viraj5903/QuantumBot-Mission.git
      ```

2. **Ensure you have Node.js and npm installed:**
    - Download and install [Node.js](https://nodejs.org/en) if you haven't already.

3. **Install Firebase CLI**:
    - If you haven't already installed Firebase CLI, run: 
      ```
      npm install -g firebase-tools
      ```

4. **Log in to Firebase**:
    - To login run: 
      ```
      firebase login
      ```

5. **Create a Firebase Project**:
    - Go to the [Firebase Console](https://console.firebase.google.com/) and sign in.
    - Click on the "Add project" button.
    - Enter a name for your project (e.g., "QuantumChat Bot").
    - (Optional) You can choose to enable Google Analytics for the project.
    - Click "Create project" and wait for it to be set up. Once done, click "Continue" to go to your project dashboard.

6. **Create a Firestore Database**:
    - In the Firebase Console, navigate to "Firestore Database" in the left-hand menu.
    - Click on "Create database."
    - Choose "Start in production mode" or "Start in test mode" (test mode is recommended for test applications).
    - Select a Cloud Firestore location (this cannot be changed later).
    - Click "Enable" to set up your Firestore database.

7. **Navigate to the root directory of the project**:  Run: 
    ```
    cd QuantumBot-Mission
    ```

1. **Initialize Firebase in your project**: 
    - To initialize thr firebase project run: 
      ```bash
      firebase init
      ```
    - ***During the initialization process***:
      - Select Firebase features: Use the arrow keys to navigate and the spacebar to select "Functions" and "Firestore", then press Enter.
      - Select Firebase project: Choose the Firebase project you created earlier.
      - Choose the language: Select JavaScript as the language for writing Cloud Functions.
      - ESLint: Opt out of ESLint if you prefer.
      - Add `firestore.rules`: Type "Y" or "Yes" when asked to add Firebase rules. (These rules define the access control and validation conditions for your Firestore database. They ensure that only authorized users can read from or write to specific parts of the database, and that the data meets certain validation criteria.)
      - Add `firestore.indexes.json`: Type "Y" or "Yes" when asked to add Firebase index rules. (Indexes help optimize query performance in Firestore. They improve the speed of queries by efficiently organizing and retrieving data based on specified fields. They are essential for maintaining fast and scalable database operations, especially in large datasets.)
      - Overwrite `functions/package.json` and `functions/index.js`: Type "N" or "No" when asked to overwrite this files. (you've already have them.)
      - Install dependencies: Type "Y" or "Yes" when asked to install dependencies (to install required dependencies).

2.  **Set up Firebase Configuration Files**:
    - ***.firebaserc***:
    This file is automatically created during the firebase init process. Ensure it contains the correct Firebase project ID:
    ```json
        {
          "projects": {
            "default": "your-firebase-project-id",
            "test": "your-firebase-project-id"
          },
          "targets": {},
          "etags": {}
        }
    ```
    Replace "your-firebase-project-id" with your actual Firebase project ID.

    - ***firebase.json***:
    Ensure your firebase.json file has the following content to configure functions deployment:
    ```json
    {
      "firestore": {
        "rules": "firestore.rules",
        "indexes": "firestore.indexes.json"
      },
      "functions": [
        {
          "source": "functions",
          "codebase": "default",
          "ignore": [
            "node_modules",
            ".git",
            "firebase-debug.log",
            "firebase-debug.*.log",
            "*.local"
          ],
          "predeploy": [
            "npm --prefix \"$RESOURCE_DIR\" run lint"
          ]
        }
      ]
    }
    ```

    - ***firestore.rules*** and ***firestore.indexes.json***:
    If you have specific security rules or indexes for Cloud Firestore, you can edit the respective files in the root directory with the necessary rules and indexes. 

3.   **Deploy the Firebase Functions**: 
    - To deploy functions to firebase run: 
      ```
      firebase deploy --only functions
      ```

## Usage Guidelines:
Once QuantumChat Bot is set up and functions are deployed, you can use Postman or any HTTP client to interact with its API endpoints. Here's how to use it:
1. Send POST requests to the provided API endpoints.
2. Include the required parameters in the request body in json as follows:
```json
{
  "data": {
    "userId": "YourUserID",
    "text": "YourMessageText"
  }
}
```
3. Receive responses with status updates and message IDs.
4. Check the newly added data inside the firestore database.

## Code Structure and Organization:
- `functions/api/addMessage.js`: Contains the Firebase Cloud Functions for adding messages to the Firestore database.
- `functions/index.js`: Initializes the Firebase Admin SDK and exports the Cloud Functions.
- `functions/.eslintrc.js`: ESLint configuration file for maintaining code quality.
- `functions/package.json`: Lists project dependencies and scripts.
- `functions/package-lock.json`: Automatically generated file that describes the exact tree that was generated by npm.

## Contribution Guidelines:
If Quantum Bot is open-source, we welcome contributions from the community. Please follow these guidelines:
- Fork the repository and make your changes on a feature branch.
- Ensure your code follows the project's coding standards.
- Submit a pull request detailing the changes you've made.
