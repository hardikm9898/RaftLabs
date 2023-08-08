import jwt from 'jsonwebtoken';
require('dotenv').config();
import { statusCode, message } from '../constant/constant';
import User from '../model/user';

import { error } from '../response-api/responseApi';

const isAuth = async (req, res, next) => {
  try {
    const rawToken = req.headers.authorization;
    if (!rawToken) {
      res
        .status(statusCode.FORBIDDEN)
        .json(error(message.NOT_AUTHORIZE, res.statusCode));
    } else {
      interface JwtPayload {
        user: {
          _id: number;
          name: string;
          userName: string;
          email: string;
          phone: number;
          password: string;
        };
        iat: number;
        exp: number;
      }
      const token = rawToken.split(' ')[1];
      const decoder = jwt.verify(
        token,
        process.env.SECRET_KEY as string
      ) as JwtPayload;
      req.user = decoder.user;
      return next();
    }
  } catch (err) {
    return res
      .status(statusCode.UNAUTHORIZED)
      .json(error(message.INVALID_TOKEN, res.statusCode));
  }
};

export default isAuth;
