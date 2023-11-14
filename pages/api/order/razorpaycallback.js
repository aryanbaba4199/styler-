// pages/api/razorpay-callback.js

import { verifySignature } from './utils';  // Import the signature verification function

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    const { order_id, razorpay_payment_id, razorpay_signature } = req.body;
    console.log(order_id);

    // Replace 'your_key_secret' with your actual key secret
    const key_secret = 'your_key_secret';

    const isValidSignature = verifySignature(order_id, razorpay_payment_id, razorpay_signature, key_secret);

    if (isValidSignature) {
        // Signature is valid, handle the success case
        console.log('Payment successful. Signature is valid.');
        res.json({ status: 'success' });
    } else {
        // Signature is not valid, handle the failure case
        console.log('Payment verification failed. Signature is not valid.');
        res.json({ status: 'failure' });
    }
  } else {
    res.status(405).end();  // Method Not Allowed
  }
}
