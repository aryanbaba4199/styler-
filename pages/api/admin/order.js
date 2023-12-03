// pages/api/orders.js

import { getSession } from "next-auth/react";
import db from "@/utils/db";
import Order from "@/models/Order";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });
      if (!session) {
        return res.status(401).end(); // Unauthorized
      }

      await db.connectDb();
      const orders = await Order.find({}).populate("products.product").lean();
      await db.disconnectDb();

      return res.status(200).json({ orders });
    } catch (error) {
      console.error("Error fetching orders:", error);
      return res.status(500).end();
    }
  } else if (req.method === "DELETE") {
    const id = req.query.id;
    try {
      const delProd = await Order.findByIdAndDelete(id);
      res.status(200).json({ "Product Delete": delProd });
    } catch (e) {
      console.error(e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "PUT") {
    const id = req.query.id;
    const { isPaid, status } = req.body;

    try {
      await db.connectDb();

      const updatedOrder = await Order.findByIdAndUpdate(
        id,
        { isPaid, status },
        { new: true }
      );

      await db.disconnectDb();

      res.status(200).json({ order: updatedOrder });
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}