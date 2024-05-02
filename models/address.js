
import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    mobile : {
        type: String,
        required: true
    },
    pin : {
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    city : {
        type: String,
        required: true
    },
    state : {
        type: String,
        required: true
    },
    landmark : {
        type: String,
        required: true
    }
});

const Address = mongoose.models['Address'] ||
mongoose.model('Address', addressSchema);

export default Address;