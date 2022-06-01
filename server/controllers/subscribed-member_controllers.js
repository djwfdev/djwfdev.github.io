//'req' stands for request and 'res' stands for response
// status codes are from httpstatuses.com

// subMember means Subscribed Member
import SubscribedMemberData from '../models/subscribed-member_model.js';

export const getSubMembers = async (req, res)=> {
    try {
        const allSubMembers = await SubscribedMemberData.find();
        res.status(200).json(allSubMembers);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createSubMember = async (req, res)=> {
    const subMember = req.body;

    const newSubMember = new SubscribedMemberData(subMember);

    try {
        await newSubMember.save();
        res.status(201).json(newSubMember);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteSubMember = async (req, res)=> {
    const id = req.params.id;
    
    try {
        await SubscribedMemberData.findByIdAndRemove(id).exec();
        res.status('Successfully deleted');
    } catch (error) {
        console.log(error);
    }
}

// works weirdly, entering the phoneNumber, it will find 0, 04, 041, etc.
// searching for 1 will cause an error, as well as 0412345679

// could possibly validate that the user must enter 10 digits (mobile length)

export const getMembersBySearch = async (req, res) => {
    const { searchFirstName, searchLastName, searchPhoneNumber } = req.query;
    try {
        const firstName = new RegExp(searchFirstName, 'i');
        const lastName = new RegExp(searchLastName, 'i');
        const phoneNumber = new RegExp(searchPhoneNumber, 'i');
        const members = await SubscribedMemberData.findOne({ $and : [{firstName:firstName}, {lastName:lastName}, {phoneNumber:phoneNumber}]});
        
        res.json({data : members });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const subMemberLogin = async (req,res)=> {
    var {email, password} = req.body;
    if(!email || !password){
        //return res.json({error : "Please add all fields"})
        return res.status(422).json({error:"Please add all fields"})
    }

    SubscribedMemberData.findOne({email:email})
    .then((savedMember) => {
        if(!savedMember){
            //return res.json({error : "Please add all fields"})
            return res.status(422).json({error:"Invalid email or password!"})
        }
        if(password == savedMember.password){
            return res.json({member: savedMember, error : "", message: "Login Successful!"})
        } else {
            //return res.json({error : "Please add all fields"})
            return res.status(422).json({error:"Invalid email or password"})
        }
    })
    .catch((err) => {
        return res.status(422).json({error:err})
    })
}

function searchMemberID(newMemberID, callback){
    SubscribedMemberData.findOne({memberID:newMemberID})
    .then((savedMemberID)=>{
        if(savedMemberID){
            //console.log("state reached true")
            callback(true); 
        }
        else {
            //console.log("state reached false")
            callback(false);
        }
    })
}

export const subMemberSignup = async (req,res)=> {
    const {firstName, lastName, phoneNumber, gender, dob, email, password} = req.body;
    var newMemberID = req.body;
    console.log(req.body)
    if(!firstName || !lastName || !phoneNumber || !gender || !dob || !email || !password){
        return res.status(422).json({error:"Add all data"})
    }
    SubscribedMemberData.findOne({email:email})
    .then((savedMember)=>{
        if(savedMember){
            return res.status(422).json({error:"A member already exists with that email!"})
        }
        var length = 0;
        SubscribedMemberData.find(req.body.memberID, function(err, docs){
            length = docs.length;
            newMemberID = 2000000 + length + 1; // 2000000 for the memberID's only.
            //console.log(newMemberID)
            searchMemberID(newMemberID, function(result){
                if(result == false){
                    const newSubMember = new SubscribedMemberData({
                        memberID: newMemberID,
                        firstName,
                        lastName,
                        phoneNumber,
                        gender,
                        dob,
                        email,
                        password,
                    })
                    newSubMember.save()
                    .then((newSubMember)=>{
                        res.json({message:"Saved the subMember successfully!"})
                        console.log("New email created: " + newSubMember.email)
                        console.log("New memberID created: " + newSubMember.memberID)
                    })
                } else {
                    console.log("A member already exists with that memberID! Please try again")
                    return res.status(422).json({error:"A member already exists with that memberID! Please try again"})
                    // check if any are deleted?
                }
            })
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}
