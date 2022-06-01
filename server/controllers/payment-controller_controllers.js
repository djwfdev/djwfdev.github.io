//'req' stands for request and 'res' stands for response
// status codes are from httpstatuses.com

// payController means Payment Controller
import PaymentControllerData from '../models/payment-controller_model.js';

export const getPayControllers = async (req, res)=> {
    try {
        const allPayControllers = await PaymentControllerData.find();
        res.status(200).json(allPayControllers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPayController = async (req, res)=> {
    const payController = req.body;

    const newPayController = new PaymentControllerData(payController);

    try {
        await newPayController.save();
        res.status(201).json(newPayController);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deletePayController = async (req, res)=> {
    const id = req.params.id;
    
    try {
        await PaymentControllerData.findByIdAndRemove(id).exec();
        res.status('Successfully deleted');
    } catch (error) {
        console.log(error);
    }
}