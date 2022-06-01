//'req' stands for request and 'res' stands for response
// status codes are from httpstatuses.com
import ReceiptData from '../models/receipt_model.js';
//For updating the average rating
import AssistanceProfessionalData from '../models/assistance-professional_model.js';

export const getReceipts = async (req, res)=> {
    try {
        const allReceipts = await ReceiptData.find();
        res.status(200).json(allReceipts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createReceipt = async (req, res)=> {
    const receipt = req.body;

    const newReceipt = new ReceiptData(receipt);
    
    try {
        await newReceipt.save();
        //Updates the average rating
        updateAverageRatingOfAP(receipt)
        res.status(201).json(receipt);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteReceipt = async (req, res)=> {
    const id = req.params.id;
    
    try {
        await ReceiptData.findByIdAndRemove(id).exec();
        res.status('Successfully deleted');
    } catch (error) {
        console.log(error);
    }
}

//Update assistant professional average rating
async function updateAverageRatingOfAP (receipt){
    try{
        //Get all ratings
        const averageRating = ReceiptData.find({assistProfID : receipt.assistProfID}, 'assistProfRating').lean().exec((err, ratings) => {
            if(err){

            }
            else{
                //Calculate the new average rating
                var averageRating = 0;
                var numberOfRatings = 1;
                //Add each rating
                for (var i = 0; i < ratings.length; i++){
                    averageRating = averageRating + ratings[i].assistProfRating;
                    numberOfRatings = numberOfRatings + 1;
                }
                var averageRating = Math.round((averageRating/numberOfRatings) * 10) / 10;
                updateAP(receipt,averageRating);
            }
        });
    }
    catch (error){
        console.error(error);
    }
}

async function updateAP(receipt,newRating){
    try{
        //Update the AP
        const newAP = await AssistanceProfessionalData.findOneAndUpdate({assistProfID:receipt.assistProfID},{avgRating:newRating},{new:true});
        await newAP.save();
    }
    catch(err){
        console.log(err);
    }
}