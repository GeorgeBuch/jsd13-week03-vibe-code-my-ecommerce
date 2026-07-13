import mongoose from 'mongoose';

export async function connectDatabase(mongodbUri) {
  if (!mongodbUri) {
    throw new Error('MONGODB_URI is not set');
  }

  await mongoose.connect(mongodbUri);
  return mongoose.connection;
}
