const mongoose=require('mongoose');
var DonorSchema=new mongoose.Schema({
FullName: {
    type:String,
    required:false
},
Latitude: {
    type:String,
    required:true
},
Longitude: {
    type:String,
    required:true
},
Email: {
    type:String,
    required:false
},
VerifiedDonor: {
    type:String,
    required:true
},
RegistrationDate: {
    type:Date,
    required:true
},
Contact: {
    type:String,
    required:true
} ,
Password: {
    type:String,
    required:false
},
Age : {
    type:Number,
    required:true
},
Sex: {
    type:String,
    required:true
},
BloodGroup : {
    type:String,
    required:true
},
ZipCode: {
    type:String,
    required:true
},
});
module.exports= mongoose.model("userinfo",DonorSchema);
