//'req' stands for request and 'res' stands for response
// status codes are from httpstatuses.com
import LocationData from '../models/location_model.js';

export const getLocations = async (req, res)=> {
    try {
        const allLocations = await LocationData.find();
        res.status(200).json(allLocations);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createLocation = async (req, res)=> {
    const location = req.body;

    const newLocation = new CustomerData(location);

    try {
        await newLocation.save();
        res.status(201).json(newLocation);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteLocation = async (req, res)=> {
    const id = req.params.id;
    
    try {
        await LocationData.findByIdAndRemove(id).exec();
        res.status('Successfully deleted');
    } catch (error) {
        console.log(error);
    }
}