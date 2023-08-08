export const success = (
  status: string,
  results: object | string,
  code: number
) => ({
  status,
  error: false,
  code,
  results,
});

export const error = (message: string, statusCode: number) => {
  // List of common HTTP request code
  interface codes {
    [key: number]: number;
  }
  const codes: codes = {
    200: 200,
    201: 201,
    400: 400,
    401: 401,
    404: 404,
    403: 403,
    422: 422,
    500: 500,
  };

  const findCode = codes[statusCode] ? statusCode : 500;

  return {
    message,
    code: findCode || 500,
    error: true,
  };
};
export const validation = (errors: string) => ({
  message: 'Validation errors',
  error: true,
  code: 401,
  errors,
});
