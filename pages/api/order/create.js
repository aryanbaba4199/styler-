import {createRouter} from "next-connect";
import db from "../../../utils/db";
import User from "../../../models/User";
import Cart from "../../../models/Cart";
import Order from "../../../models/Order";
import auth from "../../../middleware/auth";
import nodemailer from "nodemailer";
import Mail from "../../../models/mail";

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
            service : "Gmail",
            auth : {
                user: process.env.FROM_EMAIL_ADDRESS,
                pass: process.env.FROM_EMAIL_PASS,
            }
        })
        
        const mailOption = {
            from : process.env.FROM_EMAIL_ADDRESS,
            to : process.env.TO_EMAIL_PASS,
            subject : "Stylers Order Created",
            text : `
            User = ${user._id};
            Product = ${products}
            Address = ${shippingAddress}
            Payment Method = ${bookingData.mobile}
            Total = ${total}
            Total Before Discount = ${totalBeforeDiscount}
            ` 
        };
        
        await transporter.sendMail(mailOption);
            const mail = await Mail.create(req.body)
            

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
