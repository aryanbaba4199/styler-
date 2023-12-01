import mongoose from 'mongoose';

const connection = {};

async function connectDb() {
  try {
    if (connection.isConnected) {
      console.log('Ready database');
      return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('New connection to the database');
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error('Error connecting to the database:', error);
    throw error;
  }
}

async function disconnectDb() {
  try {
    if (connection.isConnected) {
      await mongoose.disconnect();
      connection.isConnected = false;
    }
  } catch (error) {
    console.error('Error disconnecting from the database:', error);
    throw error;
  }
}

const db = { connectDb, disconnectDb };
export default db;
