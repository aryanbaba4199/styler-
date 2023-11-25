// /api/order/paytm-callback.js
import { verifySignature } from './utils'; // Replace with the actual path to your signature verification function

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { ORDERID, TXNID, TXNAMOUNT, STATUS, CHECKSUMHASH } = req.body;

    // Verify the signature
    const isValidSignature = verifySignature(ORDERID, TXNID, TXNAMOUNT, STATUS, CHECKSUMHASH);

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
    res.status(405).end(); // Method Not Allowed
  }
}
