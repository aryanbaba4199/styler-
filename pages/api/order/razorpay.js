// /api/order/razorpay.js
import { v4 as uuidv4 } from 'uuid';
import Razorpay from 'razorpay';

export default async function handler(req, res) {
  const { amount } = req.body;
  
  const userDetail = req.body;


  const razorpay = new Razorpay({
    key_id: process.env.RAZOR_TID, // Replace with your Razorpay Key ID
    key_secret: process.env.RAZOR_SECRET, // Replace with your Razorpay Key Secret
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
      key: process.env.RAZOR_TID, // Replace with your Razorpay Key ID
      amount: options.amount,
      currency: options.currency,
      name: "Stylers",
      description: 'Payment for Order',
      order_id: orderId,
      handler: function (response) {
        // Handle success
        console.log(response);
        res.status(200).json({ orderId, razorpayOptions });
      },
      prefill: {
        name: 'John Doe', // Replace with customer's name
        email: 'john.doe@example.com', // Replace with customer's email
      },
      notes: {
        address: 'Customer address', // Replace with customer's address
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