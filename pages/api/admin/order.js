// pages/api/orders.js

import { getSession } from 'next-auth/react';
import db from '@/utils/db';
import Order from '@/models/Order';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).end(); // Unauthorized
    }

    

    await db.connectDb();
    const orders = await Order.find({}).populate('products.product').lean();
    await db.disconnectDb();

    return res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return res.status(500).end(); // Internal Server Error
  }
}
