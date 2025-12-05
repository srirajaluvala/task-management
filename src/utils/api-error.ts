export type ApiError = Error & { statusCode: number };

export const createError = (message: string, statusCode = 500): ApiError => {
  const error = new Error(message) as ApiError;
  error.statusCode = statusCode;
  return error;
};
