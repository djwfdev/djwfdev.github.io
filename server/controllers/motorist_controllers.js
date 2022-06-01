//'req' stands for request and 'res' stands for response
// status codes are from httpstatuses.com
import MotoristData from '../models/motorist_model.js';

export const getMotorists = async (req, res)=> {
    try {
        const allMotorists = await MotoristData.find();
        res.status(200).json(allMotorists);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMotorist = async (req, res)=> {
    const motorist = req.body;

    const newMotorist = new MotoristData(motorist);

    try {
        await newMotorist.save();
        res.status(201).json(newMotorist);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteMotorist = async (req, res)=> {
    const id = req.params.id;
    
    try {
        await MotoristData.findByIdAndRemove(id).exec();
        res.status('Successfully deleted');
    } catch (error) {
        console.log(error);
    }
}