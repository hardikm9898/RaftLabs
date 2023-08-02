const statusCode = {
  SUCCESS: 200,
  ACCEPT: 202,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  VALIDATION_ERROR: 422,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};
const message = {
  SERVER_ERROR: "Internal Server Error",
  VALIDATION_ERROR: "Invalid Credentials",
  MISSING_FIELD: "please fill all fields",
  NOT_FOUND: "Page not found",
  USER_NOT_FOUND: "User not found",
  INVALID_TOKEN: "Invalid token",
  NOT_AUTHORIZE: "Not authorized",
  REGISTERED: "Email already registered",
  REGISTER: "Signup successfully",
  LOGIN: "Login successfully",
  LOGOUT: "User logout",
  LOGINFIRST: "Login first",
};
module.exports = { statusCode, message };
