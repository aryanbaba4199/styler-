// productModel.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    id: {
        
        type: String,
    },
    url: {
        
        type: String,
    },
    detailurl: {
        
        type: String,
    },
    title: {
        
        type: Object,
    },
    price: {
        require: true,
        type: Object,
    },
    qty: {
        require: true,
        type: Number,
    },
    debugger: String,
    discount: String,
    tagline: String,
});

const Product = mongoose.models['Product'] || mongoose.model('Product', productSchema);

export default Product;
