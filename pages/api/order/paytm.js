// /api/order/paytm.js
import { v4 as uuidv4 } from "uuid";
// import PaytmChecksum from "./paytmChecksum"; // Replace with the actual path to the PaytmChecksum file

export default async function handler(req, res) {
  try {
    let user = req.body.user;
    let email = user.email;
    let amount = req.body.amount;

    const orderId = uuidv4();

    const paytmParams = {
      MID: process.env.PAYTM_MID, // Replace with your Paytm Merchant ID
      WEBSITE: process.env.PAYTM_WEBSITE, // Replace with your Paytm Website
      CHANNEL_ID: "WEB",
      INDUSTRY_TYPE_ID: "Retail",
      ORDER_ID: orderId,
      CUST_ID: user._id,
      MOBILE_NO: user.phone,
      EMAIL: email,
      TXN_AMOUNT: amount.toString(),
      CALLBACK_URL: `${process.env.BASE_URL}/api/order/paytm-callback`,
    };

    // const paytmChecksum = await PaytmChecksum.generateSignature(
    //   paytmParams,
    //   process.env.PAYTM_MERCHANT_KEY // Replace with your Paytm Merchant Key
    // );

    const paytmData = {
      paytmUrl: "https://securegw-stage.paytm.in/theia/processTransaction",
      params: { ...paytmParams, CHECKSUMHASH: paytmChecksum },
    };

    res.status(200).json(paytmData);
  } catch (error) {
    console.error("Error creating Paytm order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
