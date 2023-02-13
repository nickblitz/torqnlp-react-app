const dotenv = require("dotenv");
dotenv.config();

const functions = require("firebase-functions");
const restfulApp = require("torqnlp-restful-app");


// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.app = functions.https.onRequest(restfulApp);
