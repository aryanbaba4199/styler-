import { createRouter } from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import Cart from "../../../models/Cart";
import Order from "../../../models/Order";
import auth from "../../../middleware/auth";
import nodemailer from "nodemailer";
import Mail from "../../../models/mail";
import { json } from "body-parser";

const router = createRouter().use(auth);
db.connectDb;

router.post(async (req, res) => {
  try {
    const {
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    } = req.body;
    const user = await User.findById(req.user);

    //---------------Send Order to Gmail------------------------

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.FROM_EMAIL_ADDRESS,
        pass: process.env.FROM_EMAIL_PASS,
      },
    });

    console.log("These are the data");

    const pName = products[0].name;
    const qty = products[0].qty;
    const pSize = products[0].size;
    const userName = `${shippingAddress.firstName} ${shippingAddress.lastName}`;
    const city = shippingAddress.city;
    const mobile = shippingAddress.phoneNumber;

    const mailOption = {
      from: process.env.FROM_EMAIL_ADDRESS,
      to: process.env.TO_EMAIL_PASS,
      subject: "Stylers Order Created",

      text: `User Name : ${userName}
            City : ${city}
            Mobile : ${mobile}
            Product Name : ${pName}
            Prodduct Qty : ${qty}
            Product Size : ${pSize}
            Payment Method : ${mobile}
            Total : ${total}`,
    };
    console.log("------------------");

    await transporter.sendMail(mailOption);
    

    const newOrder = await new Order({
      user: user._id,
      products,
      shippingAddress,
      paymentMethod,
      total,
      totalBeforeDiscount,
      couponApplied,
    }).save();

    await db.disconnectDb();

    return res.json({ order_id: newOrder._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();
