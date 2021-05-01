const express=require('express');
const bodyParser = require('body-parser');  
const mongoose=require('mongoose');
const app=express();
const cors=require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const db = require('./config/keys').mongoURI;
const port=process.env.PORT||3000;
router=express.Router();
app.use('/',require('./routes/home'));
app.use('/searchDonor',require('./routes/searchDonor'));
app.use('/registerDonor',require('./routes/registerDonor'));
app.use('/verifyDonor',require('./routes/verifyDonor'));
app.use('/verifyPin',require('./routes/verifyPin'));
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(function(){ 
    console.log('MongoDB Connected')
  })
  .catch(err => console.log(err));
 const del=require("./services/deleteData");
  // del.deleteData();
setInterval(()=> {
    del.deletePending();
},9000*100); // every 15 minutes it triggers to delete the data. 
app.listen(port, function(err) {
    if(err) console.log(err);
    else    console.log(" SERVER ACTIVE ON PORT "+ port);
})
