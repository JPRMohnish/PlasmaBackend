const express=require('express');
const axios=require('axios');
const sendMessage=require('../services/smstesting');
const deleteService=require('../services/deleteData');
const DonorDatabase=require('../models/donor');
const router=express.Router();
trimAndToString = (x) => {
    try {
    if(!x) return x;
    x.trim();
    x.toString();
    return x;
    }
    catch(err) {
        console.log(err);
    }
}
trimAndToNumber =(x) => {
    try {
    if(!x) return x;
    x.trim();
    x=parseInt(x);
    return x;
    }
    catch(err) {
        console.log(err);
    }
}
router.post('/',async(req,res)=> {
    const FullName=trimAndToString(req.body.FullName);
    const Email=trimAndToString(req.body.Email);
    const Password='sameForEveryUser';
    const RegistrationDate=Date.now();
    var Contact=trimAndToString(req.body.Contact);
    Contact="+91"+Contact;
    const Age=trimAndToNumber(req.body.Age);
    const Sex=trimAndToString(req.body.Sex);
    const BloodGroup=trimAndToString(req.body.BloodGroup);
    const ZipCode=trimAndToString(req.body.ZipCode);
    const Latitude=trimAndToString(req.body.Latitude);
    const Longitude=trimAndToString(req.body.Longitude);
    var donor=new DonorDatabase({
        FullName:FullName,
        Email:Email,
        Password:Password,
        RegistrationDate:RegistrationDate,
        Contact:Contact,
        Age:Age,
        Sex:Sex,
        BloodGroup:BloodGroup,
        ZipCode:ZipCode,
        VerifiedDonor:'pending',
        Latitude:Latitude,
        Longitude:Longitude
    });
    const Donor1=await DonorDatabase.findOne({Contact:Contact});
    if(Donor1 && Donor1.VerifiedDonor=='pending') {
        // these is duplicated content and a wrong practice will remove this in future versions.
        const del= await deleteService.DeleteContact(Donor1.Contact);
        if(del=="Error") {
            res.send("Some Error Occured!");
        }
        else {
            try {
                var mess=await sendMessage.sendMessage(Contact);
                console.log(mess.status);
                if(mess.status=='pending') {
                    DonorDatabase.insertMany([donor],function(err) { 
                    if(err) console.log(err);
                    else console.log('Data may be entered succcessfully');
    
                    });
                    res.send("Working on the data and storing it");
                }
                else {
                    res.send("Invalid Phone Number")
                }
            }
            catch(err) {
                res.send("Server Unavailable Try Again in few Minutes\n");
                console.log(err);
            }
        }
    }
    else if(Donor1==null) {
        try {
            var mess=await sendMessage.sendMessage(Contact);
            console.log(mess.status);
            if(mess.status=='pending') {
                DonorDatabase.insertMany([donor],function(err) { 
                if(err) console.log(err);
                else console.log('Data may be entered succcessfully');

                });
                res.send("Working on the data and storing it");
            }
            else {
                res.send("Invalid Phone Number")
            }
        }
        catch(err) {
            res.send("Server Unavailable Try Again in few Minutes\n");
            console.log(err);
        }
    }
    else {
        res.send("Donor Already Registered Thanks");
    }
});
module.exports=router;
// curl --header "Content-Type: application/json"   --request POST   --data '{"FullName":"Mohnish Satidasani","Email":"monis.satidasani1@gmail.com","Contact":"7722908216","Age":"29","Sex":"Female","BloodGroup":"O+","ZipCode":"458001","Latitude":"75.0","Longitude":"24.0"}'   https://quiet-refuge-69287.herokuapp.com/registerDonor
// curl --header "Content-Type: application/json"   --request POST   --data '{"contact":"7722908216","code":"869376"}'   https://quiet-refuge-69287.herokuapp.com/verifyDonor
