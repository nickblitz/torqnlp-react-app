
// eslint-disable-next-line import/prefer-default-export
export class APIError extends Error {
  constructor(code = 200, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(params);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, APIError);
    }
    // Add in code and timestamp for references
    this.code = code;
    this.date = new Date();
  }
}
