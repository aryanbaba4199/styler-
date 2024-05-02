import Product from "@/models/productSchema"
import { products } from "@/constants/data"
import connectDB from "@/utils/db";


const DefaultData = async() =>{
    try{
        await connectDB();
        
        console.log("Data inserted successfully");
    }catch(e){
        console.error("Error in default product creation: " + e.message)
    }
}
export default DefaultData;