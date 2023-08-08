import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    ref: 'User',
  },
  imageUrl: {
    data: Buffer,
    type: String,
    required: true,
  },
});

export default mongoose.model('Product', productSchema);
