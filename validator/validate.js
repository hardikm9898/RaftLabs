const joi = require("joi");

const schema = {
  loginSchema: joi.object().keys({
    email: joi.string().min(3).required().email(),
    password: joi.string().min(6).required(),
  }),
  signUpSchema: joi.object().keys({
    userName: joi.string().min(5).required(),
    email: joi.string().min(3).required().email(),
    password: joi.string().alphanum().min(6).required(),
  }),
};
module.exports = schema;
