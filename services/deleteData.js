const DonorDatabase=require('../models/donor');
exports.deleteData = () => {
    DonorDatabase.remove({},(err) => {
        if(err) console.log(err);
        else console.log("Data Deleted Successfully");
    });
}
exports.deletePending =  () => {
        DonorDatabase.remove({VerifiedDonor:'pending'}, (err) => {
        if(err) return "Error";
        else return "Pending Data Deleted Successfully!";
    });
}
exports.DeleteContact = async (Contact) => {
    await DonorDatabase.remove({Contact:Contact},(err) => {
        if(err) console.log(err);
        else console.log("Contact Data Deleted Successfully!");
    });
}