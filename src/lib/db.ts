import mongoose from 'mongoose';

const URI = process.env.MONGODB_URI as string;

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(URI, {
      dbName: 'AI-SUMMARY', // optional but recommended
      tls: true,
    });
    console.log('✅ Successfully connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
};

export default dbConnect;
