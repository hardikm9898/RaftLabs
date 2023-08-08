import express from 'express';

const router = express.Router();
import validator from '../middleware/validation';
import schema from '../validator/validate';
const { signUpSchema, loginSchema } = schema;

import { register, login } from '../controller/auth';

router.post('/register', validator(signUpSchema), register);

router.post('/login', validator(loginSchema), login);

export default router;
