class TrrcError extends Error {
  constructor (message, code, errors) {
    super();
    this.message = message;
    this.code = code;
    if (errors) { this.errors = errors; }
    Error.captureStackTrace(this, this.constructor);
  }
}

class InvalidArgumetError extends TrrcError {
  constructor (message, errors) {
    super(`${message}`, 'Invalid', errors);
  }
}

class ForbiddenError extends TrrcError {
  constructor (message) {
    super(`${message}`, 'Forbidden');
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
