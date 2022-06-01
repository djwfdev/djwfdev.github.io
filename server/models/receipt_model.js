//receipt_model.js
import mongoose from "mongoose";
const dateNow = new Date(Date.now());

const receiptSchema = mongoose.Schema({
    receiptID: {
        type: Number,
        required: true,
    },
    motoristID: {
        type: Number,
        required: true,
    },
    assistProfID: {
        type: Number,
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    paymentDate: {
        type: Date,
        default: dateNow,
    },
    servicePurchased: {
        type: String,
    },
    assistProfRating: {
        type: Number,
        default: 0,
    },
});

const receipt = mongoose.model('receipt', receiptSchema);

export default receipt;
