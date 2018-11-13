class TrrcError extends Error {
  constructor (message, code, status, errors) {
    super();
    this.code = code;
    this.message = message;
    this.status = status;
    if (errors) { this.errors = errors; }
    Error.captureStackTrace(this, this.constructor);
  }
}

class InvalidArgumetError extends TrrcError {
  constructor (message, status, errors) {
    super(`${message}`, 'Invalid', status, errors);
  }
}

class ForbiddenError extends TrrcError {
  constructor (message, status, errors) {
    super(`${message}`, 'Forbidden', status, errors);
  }
}

class InternalError extends TrrcError {
  constructor (message) {
    super(`${message}`, 'InternalError');
  }
}

module.exports = {
  InvalidArgumetError,
  ForbiddenError,
  InternalError
};
