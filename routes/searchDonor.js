const express=require('express');
const router=express.Router();
const DonorDatabase=require('../models/donor');
const distance=require('../services/distanceSort');
router.get('/',async(req,res) => {
    const zipcode=req.query.pincode;
    var x=zipcode[0];
    x+=zipcode[1];
    x+=zipcode[2];
    x+="...";
    const regex = new RegExp(x, 'i')
    var results=await DonorDatabase.find({ZipCode:{$regex:regex}});
    const x1=await distance.sortByDistance(zipcode,results);
    res.send(x1);
});
module.exports=router;