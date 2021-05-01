const express=require('express');
const validate=require('../services/validatePin');
const router=express.Router();
router.get('/',async (req,res) => {
    const source=req.query.pincode;
    try{
        console.log("hi"+source);
        const result=await validate.validatePin(source);
        res.send(result);
    }
    catch(err) {
        res.send(err);
    }
});
module.exports=router;