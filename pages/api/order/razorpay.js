// /api/order/razorpay.js
import { v4 as uuidv4 } from 'uuid';
import Razorpay from 'razorpay';


export default async function handler(req, res) {
  let user = req.body.user
  
  let amount = req.body.amount;
  
  
  
  


  const razorpay = new Razorpay({
    key_id: process.env.RAZOR_TID, // Replace with your Razorpay Key ID
    key_secret: process.env.RAZOR_TSECRET, // Replace with your Razorpay Key Secret
  });

  const options = {
    amount,
    currency: 'INR',
    receipt: uuidv4(),
    payment_capture: 1,
  };

  try {
    const response = await razorpay.orders.create(options);
    const orderId = response.id;
    const razorpayOptions = {
      key_id: process.env.RAZOR_MID, // Replace with your Razorpay Key ID
      amount: options.amount,
      currency: "INR",
      name: "Stylers",
      description: 'Payment for Order',
      order_id: orderId,
      handler: function (response) {
        res.status(200).json({ orderId, razorpayOptions });
      },
      prefill: {
        name: `${user.name}`, 
        email: `${user.email}`,
      },
      notes: {
        address: `${user.address}`, 
      },
      theme: {
        color: '#528FF0',
      },
    };

    res.status(200).json({ orderId, razorpayOptions });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
