//'req' stands for request and 'res' stands for response
// status codes are from httpstatuses.com
import ServiceData from '../models/service_model.js';
import {addAvailableJobs} from '../controllers/assistance-professional_controllers.js';

export const getServices = async (req, res)=> {
    try {
        const allServices = await ServiceData.find();
        res.status(200).json(allServices);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createService = async (req, res)=> {
    const service = req.body;

    const newService = new ServiceData(service);

    try {
        await newService.save();
        //Add available jobs
        addAvailableJobs(service)
        res.status(201).json(newService);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteService = async (req, res)=> {
    const id = req.params.id;
    
    try {
        await ServiceData.findByIdAndRemove(id).exec();
        res.status('Successfully deleted');
    } catch (error) {
        console.log(error);
    }
}