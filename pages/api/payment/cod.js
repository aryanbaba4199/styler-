import db from "@/utils/db";
import CODOrder from "@/models/cod";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  db();
  const { passcode } = req.query;

  if (req.method === "POST" && passcode == "727798") {
    try {
      const { product, address, selectedMethod } = req.body;

      let paymentMethod = selectedMethod;
      const cod = new CODOrder({
        product,
        addresses: address,
        paymentMethod,
      });
    
      const saveCOD = await cod.save();
    
      const transport = nodemailer.createTransport({
        service : "Gmail",
        auth: {
          user : process.env.FROM_EMAIL_ADDRESS,
          pass : process.env.FROM_EMAIL_PASS
        }
      }) 
      console.log(transport);

      const mail = {
        from : process.env.FROM_EMAIL_ADDRESS,
        to : "sarkaranup465@gmail.com",
        subject : "AGS Order Created",
        text : `
        name : ${address.name},
        Mobile : ${address.mobile},
        address : ${address.address},
        product : ${product.name || "Not Defined"},
        `
      }
      
      const mailer = await transport.sendMail(mail);
      
      

      res.status(200).json({ message: " successful" });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }if(req.method==="GET"){
    try{
      const orders = await CODOrder.find();
      res.status(200).json(orders);
    }catch(err){
      res.status(500).json({ message: err.message });
      console.log(err);
    }
  }
  if(req.method==="DELETE"){
    const {id} = req.query;
    console.log(id);
  }
}
