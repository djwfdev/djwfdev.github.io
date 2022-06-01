//service_model.js
import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    serviceID: {
        type: Number,
        required: true,
    },
    motoristID: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    vehicleForServicing: {
        type: String,
        required: true,
    },
    serviceType: {
        type: String,
        default: "Unknown",
    },
    callOutFee: {
        type: Number,
        default: 20,
    },
});

const service = mongoose.model('service', serviceSchema);

export default service;
