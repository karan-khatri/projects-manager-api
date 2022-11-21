import mongoose from 'mongoose';

const connectDB = (url) => {
  return mongoose.connect(url).then(() => console.log('Connection Successful'));
};

export default connectDB;
