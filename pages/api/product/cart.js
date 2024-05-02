import database from "@/utils/db";
import Cart from "@/models/cart";

export default async function handler(req, res) {
  await database();

  if (req.method === "POST") {
    try {
      const { userId, productId } = req.body;

      const cart = new Cart({
        userId: userId,
        productId: productId,
      });
      const saveData = await cart.save();

      res.status(200).json({ message: "Success!" });
    } catch (e) {
      console.log("Error saving", e);
      res.status(500).json({ message: "Error saving" });
    }
  }
  if (req.method === "GET") {
    try {
      const userId = req.query.id;
      
      const cartData = await Cart.find({ userId });
   
      const productIds = cartData.map((item) => item.productId);
      console.log("ProductIds: " , productIds);
      res.status(200).json(productIds);
    } catch (error) {
      console.error("Error fetching cart data", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  if (req.method === "DELETE") {
    const { id } = req.query;
    console.log(id);
  
    try {
      const dbResponse = await Cart.findOneAndDelete({productId : id}); 
      if (dbResponse) {
        console.log(dbResponse);
        res.status(200).json({ message: "success" });
      } else {
        res.status(404).json({ error: "Document not found" });
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
      console.error("Error deleting:", e);
    }
  }
  
  
}
