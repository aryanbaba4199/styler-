import db from "@/utils/db";
import Product from "@/models/product";

export default async function hanlder(req, res) {
  db();
  if (req.method == "GET") {
    const { color } = req.query;
    try {
      const product = await Product.find({color: color});
      console.log("d", product);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(405).json("Product not found");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Product not found");
    }
  }
}
