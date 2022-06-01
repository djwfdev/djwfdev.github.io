//'req' stands for request and 'res' stands for response
// status codes are from httpstatuses.com
import VehicleData from '../models/vehicle_model.js';

export const getVehicles = async (req, res)=> {
    try {
        const allVehicles = await VehicleData.find();
        res.status(200).json(allVehicles);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createVehicle = async (req,res)=> {
    const { plateNumber, manufacturer, model, year, body_type, colour } = req.body;
    console.log(req.body)
    if(!plateNumber || !manufacturer || !model || !year || !body_type || !colour){
        return res.status(422).json({error:"Add all data!"})
    } else {
        const newVehicle = new VehicleData({
            plateNumber,
            manufacturer,
            model,
            year,
            body_type,
            colour,
        })
        newVehicle.save()
        .then((newVehicle)=>{
            res.json({message:"Saved all data successfully!"})
            console.log("New vehicle created: " + newVehicle.year + " " + newVehicle.manufacturer + " " + newVehicle.model + " " + newVehicle.body_type + " in " + newVehicle.colour)
        })
    }
}

export const deleteVehicle = async (req, res)=> {
    const id = req.params.id;
    
    try {
        await VehicleData.findByIdAndRemove(id).exec();
        res.status('Successfully deleted');
    } catch (error) {
        console.log(error);
    }
}
