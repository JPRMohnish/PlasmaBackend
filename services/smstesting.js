const accountSid = require('../config/keys').TWILIO_ACCOUNT_SID;
const authToken = require('../config/keys').TWILIO_AUTH_TOKEN;
const serviceID=require('../config/keys').serviceID;
const client = require('twilio')(accountSid, authToken);
exports.sendMessage =async (contact) => {
    try {
        const client = require('twilio')(accountSid, authToken);
        const message =await client.verify.services(serviceID)
                    .verifications
                    .create({to: contact, channel: 'sms'});
             console.log(message);
             return message;
    }
catch(err) {
    console.log(err);
}
}
exports.verifyUser =async (contact, code) => {
    try {
        console.log(contact+" "+code);
        const client = require('twilio')(accountSid, authToken);
        const message= await client.verify.services(serviceID)
            .verificationChecks
            .create({to: contact, code: code})
            
        console.log(message);
        return message;
    }
    catch(err) {
        console.log("IT IS"+err);
    }
}