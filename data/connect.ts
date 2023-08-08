require('dotenv').config();
import mongoose from 'mongoose';

const connect = mongoose
  .connect(process.env.URL as string)
  .then(() => {
    console.log('database connected');
  })
  .catch((err) => {
    console.log(err);
  });

export default connect;
