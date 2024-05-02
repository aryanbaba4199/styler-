import mongoose from 'mongoose';

const codSchema = new mongoose.Schema({
    product : {
        type :[] ,
        required : true
    }, 
    addresses : {
        type : [],
        required : true
    },
    paymentMethod : {
        required : true,
        type : String,
    }
});

const CODOrder = mongoose.models['COD_Order'] || mongoose.model('COD_Order', codSchema);
export default CODOrder;