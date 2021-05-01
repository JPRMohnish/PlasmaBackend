const express=require('express');
const verifyUser=require('../services/smstesting');
const DonorDatabase=require('../models/donor');
const router=express.Router();
router.post('/',async (req,res) => {
    var contact=req.body.contact;
    const code=req.body.code;
    contact="+91"+contact;
    console.log(contact+" "+code);
    try {
    const users=await DonorDatabase.findOne({Contact:contact});
        if(users) {
            const message=await verifyUser.verifyUser(contact,code);
            if(message.status=='approved') {
                DonorDatabase.findOneAndUpdate({Contact:contact},{VerifiedDonor:'approved'},(err,donors) => {
                    if(err) {
                        console.log(err);
                        res.send('Some error occured Try Again');                    }
                    else {
                        console.log(donors);
                        res.send('Donor verified Successfully')
                    }
                });
            }
            else {
                res.send('Wrong OTP');
            }
        }
        else {
            res.send('Number not found');
        }
    }
    catch(err) {
        res.send("Number not found");
    }
});
module.exports=router;