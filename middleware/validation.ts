import { statusCode } from '../constant/constant';
import { validation } from '../response-api/responseApi';

interface detail {
  message: string;
}

const validator = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  const valid = error == null;
  if (valid) {
    next();
  } else {
    const { details } = error;
    const message = details.map((detail: detail) => detail.message).join(',');
    res.status(statusCode.VALIDATION_ERROR).json(validation(message));
  }
};
export default validator;
