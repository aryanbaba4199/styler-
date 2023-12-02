// lib/mongodb.ts
import db from "../../../../utils/db"
import { MongoClient } from 'mongodb';
db.connectDb();
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export default clientPromise;
