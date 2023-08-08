import jwt from 'jsonwebtoken';
import { statusCode, message } from '../constant/constant';
import User from '../model/user';

import { success, error, validation } from '../response-api/responseApi';

export const register = async (req, res) => {
  try {
    const { userName, email, password, name, phone } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res
        .status(statusCode.CONFLICT)
        .json(error(message.REGISTERED, res.statusCode));
    }

    user = new User({ name, userName, email, password, phone });

    await user.save();
    res
      .status(statusCode.SUCCESS)
      .json(success('Success', message.REGISTER, res.statusCode));
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res
        .status(statusCode.VALIDATION_ERROR)
        .json(error(message.VALIDATION_ERROR, res.statusCode));

    // const valid = await bcrypt.compare(password, user.password);
    const valid = password === user.password;

    if (!valid)
      return res
        .status(statusCode.VALIDATION_ERROR)
        .json(error(message.VALIDATION_ERROR, res.statusCode));

    const jwtToken = await jwt.sign(
      { user },
      process.env.SECRET_KEY as string,
      {
        expiresIn: '24h',
      }
    );
    console.log(jwtToken);
    res
      .status(statusCode.SUCCESS)
      .json(success('success', message.LOGIN, res.statusCode));
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};
