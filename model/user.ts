import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },

  phone: {
    type: Number,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});
export default mongoose.model('Users', userSchema);
