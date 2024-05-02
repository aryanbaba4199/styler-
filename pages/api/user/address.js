import db from "@/utils/db";
import Address from "@/models/address";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, mobile, pin, address, city, state, landmark } = req.body;
      console.log(name, mobile, pin, address, city, state);
      const newAddress = new Address({
        name,
        mobile,
        pin,
        address,
        city,
        state,
        landmark,
      });
      const save = await newAddress.save();
      console.log("Save Address", save);
      res.status(200).json({message : 'Success'})
    } catch (err) {
      console.log(err);
      res.status(500).json({message : 'Error'});
    }
  }
  if(req.method === 'GET'){
    try{
    const address = await Address.find();
    res.status(200).json(address);
    }catch(e){
      console.error('Error fetching addresses:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
  }
  if(req.method === 'DELETE'){
    const {id } = req.query;
    try{
    const address = await Address.findByIdAndDelete(id);
    res.status(200).json({message:"Deleted"});
    }
    catch(e){
      res.status(500).json({ error: 'Internal Server Error'});
      console.log(e);
    }
    
  }
}
