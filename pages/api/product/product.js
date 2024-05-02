// handler.js
import Product from '@/models/productSchema';
import connectDB from '@/utils/db';
export default async function handler(req, res) {
    await connectDB();
    if (req.method === 'GET') {
        try {
            const products = await Product.find({});
            res.status(200).json(products);
        } catch (e) {
            console.error(e);
            res.status(404).json({ message: 'Product not found' });
        }
    }
    if (req.method === "POST" && req.query.productIds) {
        try {
            const productIds = req.query.productIds;
    
            // Convert the comma-separated string to an array of strings
            const productIdArray = productIds.split(',');
    
            const products = [];
    
            // Fetch data for each product ID
            for (const productId of productIdArray) {
                const productData = await Product.findById(productId);
                
    
                if (productData) {
                    products.push(productData);
                }
            }
            
            res.status(200).json(products);
        } catch (error) {
            console.error("Error fetching products", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    
}
