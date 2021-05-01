const express = require('express');
const router = express.Router();
router.get('/',(req,res) => {
        res.send("HELLO WE ARE MAKING A PLASMA DONOR FINDER API FOR FIGHTING COVID 19.");
});
module.exports=router;