//'req' stands for request and 'res' stands for response
// status codes are from httpstatuses.com

// AssistProf means Assistance Professional
import AssistanceProfessionalData from '../models/assistance-professional_model.js';

export const getAssistProfs = async (req, res)=> {
    try {
        const allAssistProfs = await AssistanceProfessionalData.find();
        res.status(200).json(allAssistProfs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createAssistProf = async (req, res)=> {
    const assistProf = req.body;

    const newAssistProf = new AssistanceProfessionalData(assistProf);

    try {
        await newAssistProf.save();
        res.status(201).json(newAssistProf);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteAssistProf = async (req, res)=> {
    const id = req.params.id;
    
    try {
        await AssistanceProfessionalData.findByIdAndRemove(id).exec();
        res.status('Successfully deleted');
    } catch (error) {
        console.log(error);
    }
}


function searchAssistProfID(newAssistProfID, callback){
    AssistanceProfessionalData.findOne({assistProfID:newAssistProfID})
    .then((savedAssistProfID)=>{
        if(savedAssistProfID){
            //console.log("state reached true")
            callback(true); 
        }
        else {
            //console.log("state reached false")
            callback(false);
        }
    })
}

export const assistProfSignup = async (req,res)=> {
    const { firstName, lastName, gender, dob, email, password} = req.body;
    var newAssistProfID = req.body;
    console.log(req.body)
    if(!firstName || !lastName || !gender || !dob || !email || !password){
        return res.status(422).json({error:"Add all data"})
    }
    AssistanceProfessionalData.findOne({email:email})
    .then((savedAssistProf)=>{
        if(savedAssistProf){
            return res.status(422).json({error:"An assistance professional already exists with that email!"})
        }
        var length = 0;
        AssistanceProfessionalData.find(req.body.assistProfID, function(err, docs){
            length = docs.length;
            newAssistProfID = 3000000 + length + 1; // 3000000 for the assistProfID's only.
            //console.log(newAssistProfID)
            searchAssistProfID(newAssistProfID, function(result){
                //console.log("result: " + result)
                if(result == false){
                    const newAssistProf = new AssistanceProfessionalData({
                        assistProfID: newAssistProfID,
                        firstName,
                        lastName,
                        gender,
                        dob,
                        email,
                        password,
                    })
                    newAssistProf.save()
                    .then((newAssistProf)=>{
                        res.json({message:"Saved the Assistance Professional successfully!"})
                        console.log("New email created: " + newAssistProf.email)
                        console.log("New assistProfID created: " + newAssistProf.assistProfID)
                    })
                } else {
                    console.log("An Assistance Professional already exists with that assistProfID! Please try again")
                    return res.status(422).json({error:"An Assistance Professional already exists with that assistProfID! Please try again"})
                }
            })
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}

export const assistProfLogin = async (req,res)=> {
    var {email, password} = req.body;
    if(!email || !password){
        return res.status(422).json({error:"Please add all fields"})
    }
    AssistanceProfessionalData.findOne({email:email})
    .then((savedAssistProf) => {
        if(!savedAssistProf){
            return res.status(422).json({error:"Invalid email or password!"})
        }
        if(password == savedAssistProf.password){
            res.json({message:"Login Successful!"})
        } else {
            return res.status(422).json({error:"Invalid email or password"})
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

//For assigning random distances and Populating available jobs
export const addAvailableJobs = async (service)=>{
    try{
        //Get all ratings
        AssistanceProfessionalData.find({}, 'assistProfID').lean().exec(async function (err, IDs){
            if(err){

            }
            else{
                //Add each rating
                for (var i = 0; i < IDs.length; i++){
                    //Random distance
                    var maxDist = 50;
                    var randomDist = Math.round((Math.random() * (maxDist - 0) + 0)*10)/10;

                    //Update the AP
                    var job = {jobID:service.serviceID, distanceFromAP:randomDist};
                    const newAP = await AssistanceProfessionalData.findOneAndUpdate({assistProfID:IDs[i].assistProfID},{"$push": { "availableJobs": job }},{new:true});
                    await newAP.save();
                }
                
            }
        });
    }
    catch (error){
        console.error(error);
    }
}
