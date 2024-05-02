import db from "@/utils/db";
import Service from "@/models/service";
export default async function handler(req, res) {
  db();
  if (req.method == "POST") {
    const { name, mobile, pin, address, city, state, landmark, select } =
      req.body;
      console.log("Service", select);

    try {
      const newService = new Service({
        name,
        mobile,
        pin,
        address,
        city,
        state,
        landmark,
        select 
    });
    console.log(select);
      await newService.save();
      res.status(200).json({ message: "Success!" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error " });
    }
  }
}
