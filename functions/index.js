const dotenv = require("dotenv");
dotenv.config();

const functions = require("firebase-functions");
const restfulApp = require("torqnlp-restful-app");


/**
 * dataPreperationService is a task queue that is used to prepare data to create custom fine-tuned models. 
 */
exports.dataPreperationService = functions
.runWith( {secrets: ["OPENAI_API_KEY"]})
.tasks.taskQueue({
  retryConfig: {
    maxAttempts: 5,
    minBackoffSeconds: 60,
  },
  rateLimits: {
    maxConcurrentDispatches: 6,
  },
}).onDispatch(async (data) => {
  // Here will be an imported function to excute the data preperation service.
  return { success: true };
});

/**
 * modelFineTuningService is a task queue that is used to fine-tune models.
 */
exports.modelFineTuningService = functions
.runWith( {secrets: ["OPENAI_API_KEY"]})
.tasks.taskQueue({
  retryConfig: {
    maxAttempts: 5,
    minBackoffSeconds: 60,
  },
  rateLimits: {
    maxConcurrentDispatches: 6,
  },
}).onDispatch(async (data) => {
  // Here we will take pre pared data and create a fine-tuned model.
  return { success: true };
});

/**
 * modelEmbeddingService is a task queue that is used to create embeddings for models.
 */
exports.modelEmbeddingService = functions
.runWith( {secrets: ["OPENAI_API_KEY"]})
.tasks.taskQueue({
  retryConfig: {
    maxAttempts: 5,
    minBackoffSeconds: 60,
  },
  rateLimits: {
    maxConcurrentDispatches: 6,
  },
}).onDispatch(async (data) => {
  // Here we will take pre pared data and create a fine-tuned model.
  return { success: true };
});

exports.app = functions.https.onRequest(restfulApp);
