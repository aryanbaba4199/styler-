import { createRouter } from "next-connect";
import db from "../../../utils/db";
import Product from "../../../models/Product";
import User from "../../../models/User";
import Cart from "../../../models/Cart";
import auth from "../../../middleware/auth";

const router = createRouter().use(auth);

router.post(async (req, res) => {
    try {
        // Connect to the database
        await db.connectDb();

        const { cart } = req.body;
        let products = [];
        let user = await User.findById(req.user);
        let existingCart = await Cart.findOne({ user: user._id });

        if (existingCart) {
            // If there is an existing cart, delete it
            await existingCart.deleteOne();
        }

        // Process cart items
        for (let i = 0; i < cart.length; i++) {
            let dbProduct = await Product.findById(cart[i]._id).lean();
            let subProduct = dbProduct.subProducts[cart[i].style];
            let tempProduct = {
                name: dbProduct.name,
                product: dbProduct._id,
                color: {
                    color: cart[i].color.color,
                    image: cart[i].color.image,
                },
                image: subProduct.images[0].url,
                qty: Number(cart[i].qty),
                size: cart[i].size,
            };

            let price = Number(
                subProduct.sizes.find((p) => p.size == cart[i].size).price
            );

            tempProduct.price =
                subProduct.discount > 0
                    ? (price - price / Number(subProduct.discount)).toFixed(2)
                    : price.toFixed(2);

            products.push(tempProduct);
        }

        // Calculate cart total
        let cartTotal = products.reduce(
            (total, product) => total + product.price * product.qty,
            0
        );

        // Save the new cart
        await new Cart({
            products,
            cartTotal: cartTotal.toFixed(2),
            user: user._id,
        }).save();

        // Disconnect from the database
        await db.disconnectDb();

        return res.status(200).json({
            message: "Cart items successfully added.",
            status: true,
        });
    } catch (error) {
        console.error(error);

        // Disconnect from the database in case of an error
        await db.disconnectDb();

        return res.status(500).json({
            message: "Internal Server Error",
            status: false,
            error: error.message,
        });
    }
});

export default router.handler();
