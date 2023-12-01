import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from './auth/lib/mongodb';

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const client = await clientPromise;
    // Do your database operations using 'client'

    res.status(200).json({ name: 'Raushan Kumar' });
  } catch (er) {
    console.error('Error connecting to MongoDB:', er);
    res.status(500).json({er});
  }
}
