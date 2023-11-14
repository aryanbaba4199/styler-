import db from "@/utils/db";
import mongoose from "mongoose";

export const fetchProductData = async () => {
  try {
    await db.connectDb();

    // Use mongoose.model directly to retrieve the Product model
    const Product = mongoose.model("Product");

    const products = await Product.find().lean();
    const productSlugs = products.map((product) => product.slug);
    const productNames = products.map((product) => product.name);
    const productDescriptions = products.map((product) => product.description);
   

    return {
      productSlugs,
      productNames,
      productDescriptions,
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return {
      productSlugs: [],
      productNames: [],
      productDescriptions: [],
    };
  } finally {
    // Close the database connection if opened on the server
    await db.disconnectDb();
  }
};
