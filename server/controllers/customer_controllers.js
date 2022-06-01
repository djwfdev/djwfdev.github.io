//'req' stands for request and 'res' stands for response
// status codes are from httpstatuses.com
import CustomerData from '../models/customer_model.js';

export const getCustomers = async (req, res)=> {
    try {
        const allCustomers = await CustomerData.find();
        res.status(200).json(allCustomers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createCustomer = async (req, res)=> {
    const customer = req.body;

    const newCustomer = new CustomerData(customer);

    try {
        await newCustomer.save();
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteCustomer = async (req, res)=> {
    const id = req.params.id;
    
    try {
        await CustomerData.findByIdAndRemove(id).exec();
        res.status('Successfully deleted');
    } catch (error) {
        console.log(error);
    }
}