import db from "@/utils/db";
import Seller from "@/models/sellerform";

export default async function handler(req, res) {
  db();
  if (req.method === "POST") {
    try {
      const { name, email, mobile, gst } = req.body;
      console.log(name, email, mobile, gst);
      const seller = new Seller({
        name,
        email,
        mobile,
        gst,
      });
      console.log(name, email, mobile, gst);
      const data = await seller.save();
      console.log(data);
      res.status(200).json({ success: "success" });
    } catch (e) {
      res.status(500).json({ menubar: "error" });
      console.error(e);
    }
  }
}
