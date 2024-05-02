import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema({
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
    },
    select :{
        type : [],
        required: true
    }
})

const Service = mongoose.models['Service'] ||
mongoose.model('Service', serviceSchema)

export default Service;