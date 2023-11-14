// import nc from "next-connect";
// import db from "../../../utils/db";
// import Order from "../../../models/Order";
// import auth from "../../../middleware/auth";

// const handler = nc().use(auth);

// handler.put(async (req, res) => {
//     try {
//         db.connectDb;
//         const {id} = req.body;

//         const result = await Order.findOneAndUpdate(
//             { _id: id},
//             { isPaid: true },
//             { new: true }
//         );
//         db.disconnectDb();
//             // console.log('res api > ', result)
//         return res.json(result);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// export default handler;








// /api/order/payment.js
import {createRouter} from "next-connect";
import db from '../../../utils/db';
import Order from '../../../models/Order';
import auth from '../../../middleware/auth';

const router = createRouter().use(auth);

router.put(async (req, res) => {
  try {
    await db.connectDb();

    const {method, id, razorpayPaymentId } = req.body;

    // Check if the Razorpay payment is successful
    if (razorpayPaymentId) {
      // Update the order to mark it as paid and store the Razorpay payment ID
      const result = await Order.findOneAndUpdate(
        { _id: id },
        {
          isPaid: true,
          razorpayPaymentId,
          // You may also want to update other payment-related fields in your Order model.
        },
        { new: true }
      );

      await db.disconnectDb();

      return res.json(result);
    }
    else if(method){
      const result = await Order.findOneAndUpdate(
        { _id: id },
        { isPaid: true, method},
        {new : true }
      );
      await db.disconnectDb();

      return res.json(result);
    }
    
    
    
    else {
      // If Razorpay payment ID is not present, handle the error.
      await db.disconnectDb();
      return res.status(400).json({ message: 'Razorpay payment ID is missing.' });
    }
  } catch (error) {
    await db.disconnectDb();
    return res.status(500).json({ message: error.message });
  }
});

export default  router.handler();

