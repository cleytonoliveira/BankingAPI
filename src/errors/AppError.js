class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.errorCode = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = 0) {
    super(message, 404);
  }
}

module.exports = {
  AppError,
  NotFoundError,
};
