import Product from "@/models/productSchema";
import connectDB from "@/utils/db";

export default async function handler(req, res) {
  connectDB();
  const { id } = req.query; // Ensure `id` is correctly extracted
  
  try {
    if (!id) {
      return res.status(400).json({ message: "ID parameter is missing" });
    }

    const product = await Product.findOne({ _id: id });
    
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
}
