export const success = (status, results, code) => ({
  status,
  error: false,
  code,
  results,
});

export const error = (message, statusCode) => {
  // List of common HTTP request code
  const codes = {
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
export const validation = (errors) => ({
  message: 'Validation errors',
  error: true,
  code: 401,
  errors,
});
