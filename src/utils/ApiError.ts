class ApiError extends Error {
  statusCode: number;
  message: string;
  errors: unknown[];
  constructor(
    statusCode: number,
    message: string = "something went wrong",
    errors: unknown[] = [],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
