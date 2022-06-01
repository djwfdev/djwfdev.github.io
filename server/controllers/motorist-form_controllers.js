import express from 'express';
import SubscribedMemberData from '../models/subscribed-member_model.js';
import CustomerData from '../models/customer_model.js';
import MotoristData from '../models/motorist_model.js';
import LocationData from '../models/location_model.js';
import VehicleData from '../models/vehicle_model.js';
import ServiceData from '../models/service_model.js';

export const createCustomerForm = async (req, res)=> {
    // may have to include isMember and motoristID as there could be a selection
    // option where the motorist can choose whether they are a member, and input a member no.
    
    // making the form, I feel like we only need:
    // Customer class = firstName, lastName, phoneNumber, (updated)
    // Location class = streetName, streetNum(if applicable, default is '1'), suburb, nearestCrossroad[streetOne, streetTwo](if known), (updated)
    // Vehicle class = plateNumber, manufacturer, model, year, body_type, colour, (updated)
    // Service class = serviceType(what the AP is servicing, default is 'unknown') (updated)

    const {firstName, lastName, phoneNumber, streetName, streetNum, suburb, nearestCrossroad, plateNumber, manufacturer, model, year, body_type, colour, serviceType} = req.body;
    var newServiceID = req.body;
    var newCustomerID = req.body;
    var newMotoristID = req.body;
    console.log(req.body)
    if(!firstName || !lastName || !phoneNumber || !streetName || !suburb || !nearestCrossroad || !plateNumber || !manufacturer || !model || !year || !body_type || !colour){
        console.log("Not all data included");
        return res.status(422).json({error:"Need to include all required data!"})
    }
    var customer_length = 0;
    var service_length = 0;
    CustomerData.find(req.body.customerID, function(err, docs){
        customer_length = docs.length;
        newCustomerID = 1000000 + customer_length + 1; // 1000000 for the customerID's only.
        const newCustomer = new CustomerData({
            customerID : newCustomerID,
            firstName,
            lastName,
            phoneNumber,
        })
        newCustomer.save()
        .then((newCustomer)=>{
            //res.json({message:"Saved the Customer successfully!"})
            console.log("New customer created: " + newCustomer.firstName + " " + newCustomer.lastName)
            console.log("New customerID created: " + newCustomer.customerID)
        })
        newMotoristID = newCustomerID;
        const newMotorist = new MotoristData({
            motoristID : newMotoristID,
            vehicles: [{plateNumber}],
        })
        newMotorist.save()
        .then((newMotorist)=>{
            //res.json({message:"Saved the Motorist successfully!"})
            console.log("New motorist created: " + newMotorist.motoristID)
        })

        const newLocation = new LocationData({
            streetName,
            streetNum,
            suburb,
            nearestCrossroad,
            userID : newMotoristID,
        })
        newLocation.save()
        .then((newLocation)=>{
            //res.json({message:"Saved the Location successfully!"})
            console.log("New location created: " + newLocation.streetNum + " " + newLocation.streetName + ", " + newLocation.suburb)
        })

        ServiceData.find(req.body.serviceID, function(err, docs){
            service_length = docs.length;
            newServiceID = 5000000 + service_length + 1; // 5000000 for the serviceID's only.
            const newService = new ServiceData({
                serviceID : newServiceID,
                motoristID : newMotoristID,
                vehicleForServicing : plateNumber,
                serviceType,
            })
            newService.save()
            .then((newService)=>{
                //res.json({message:"Saved the Service successfully!"})
                console.log("New service created: " + newService.serviceType)
            })
        })
    })
    const newVehicle = new VehicleData({
        plateNumber : plateNumber,
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

export const createMemberForm = async (req, res)=> {
    // may have to include isMember and motoristID as there could be a selection
    // option where the motorist can choose whether they are a member, and input a member no.
    
    // making the form, I feel like we only need:
    // Member class = firstName, lastName, phoneNumber, (will be auto-filled)
    // Location class = streetName, streetNum(if applicable, default is '1'), suburb, nearestCrossroad[streetOne, streetTwo](if known), (updated)
    // Vehicle class = plateNumber, manufacturer, model, year, body_type, colour, (will be opted to search for a plateNumber under their name, if using a different
    // vehicle then they can specify it)
    // Service class = serviceType(what the AP is servicing, default is 'unknown') (updated)

    const {streetName, streetNum, suburb, nearestCrossroad, plateNumber, serviceType} = req.body;
    var newServiceID = req.body;
    var newMotoristID = req.body;
    console.log(req.body)
    if(!streetName || !suburb || !nearestCrossroad || !plateNumber){
        console.log("Not all data included");
        return res.status(422).json({error:"Need to include all required data!"})
    }
    SubscribedMemberData.findOne()
    .then((savedMember)=>{
        // We need to use the localStorage I think to grab the data from the member search, and auto fill it here for the firstName,
        // lastName and phoneNumber
    })
    .catch((err)=>{
        console.log(err);
    })
    
    
    var service_length = 0;
    newMotoristID = memberID;
    
    // We then use the phoneNumber attr. to search in SubscribedMemberData to find a single document which contains the motoristID,
    // and the use the motoristID in MotoristData to find the vehicles array. From there, we can list all the vehicles under that motoristID,
    // or, they can choose to create a new one under that motoristID.
    
    VehicleData.findOne({plateNumber:plateNumber})
    .then((savedPlateNumber)=>{
        if(savedPlateNumber){
            //this is where we auto fill the details into the front-end display
        } else {
            const {manufacturer, model, year, body_type, colour} = req.body;
            if(!plateNumber || !manufacturer || !model || !year || !body_type || !colour){
                console.log("Not all data included");
                return res.status(422).json({error:"Need to include all required vehicle data!"})
            }
            
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
                //res.json({message:"Saved the new Vehicle successfully!"})
                console.log("New vehicle created: " + newVehicle.year + " " + newVehicle.manufacturer + " " + newVehicle.model + " " + newVehicle.body_type + " in " + newVehicle.colour)
            })
        }
    })
    .catch((err)=>{
        console.log(err);
    })

    const newMotorist = new MotoristData({
        isMember : true,
        motoristID : newMotoristID,
    })
    newMotorist.save()
    .then((newMotorist)=>{
        //res.json({message:"Saved the Motorist successfully!"})
        console.log("New motorist created: " + newMotorist.motoristID)
    })

    const newLocation = new LocationData({
        streetName,
        streetNum,
        suburb,
        nearestCrossroad,
        userID : newMotoristID,
    })
    newLocation.save()
    .then((newLocation)=>{
        //res.json({message:"Saved the Location successfully!"})
        console.log("New location created: " + newLocation.streetNum + " " + newLocation.streetName + ", " + newLocation.suburb)
    })

    ServiceData.find(req.body.serviceID, function(err, docs){
        service_length = docs.length;
        newServiceID = 5000000 + service_length + 1; // 5000000 for the serviceID's only.
        const newService = new ServiceData({
            serviceID : newServiceID,
            motoristID : newMotoristID,
            vehicleForServicing : plateNumber,
            serviceType,
        })
        newService.save()
        .then((newService)=>{
        res.json({message:"Saved all data successfully!"})
            console.log("New service created: " + newService.serviceType)
        })
    })
}
