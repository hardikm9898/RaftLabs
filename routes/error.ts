import express from 'express';
import { error } from '../response-api/responseApi';
import { statusCode, message } from '../constant/constant';
const router = express.Router();

router.use((req, res) => {
  res
    .status(statusCode.UNAUTHORIZED)
    .json(error(message.NOT_FOUND, res.statusCode));
});

export default router;
