import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    name : {
        required : true,
        type : String,
    },
    email : {
        required : true,
        type : String,
    },
    mobile : {
        required : true,
        type : String,
    },
    gst : {
        
        type : String,
    }
})

const Seller = mongoose.models['seller'] ||
mongoose.model('seller', sellerSchema);

export default Seller;