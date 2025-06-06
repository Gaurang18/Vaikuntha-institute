export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof AppError) {
    return {
      message: error.message,
      statusCode: error.statusCode,
      code: error.code,
    };
  }

  // Log unexpected errors
  console.error('Unexpected error:', error);

  return {
    message: 'An unexpected error occurred',
    statusCode: 500,
    code: 'INTERNAL_SERVER_ERROR',
  };
};

export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
}; 