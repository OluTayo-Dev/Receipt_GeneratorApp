import mongoose from "mongoose";



const profileSchema = mongoose.Schema({
    companyName: String,
    address: String,
    phoneNo: String,
    plan: String,


});

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;

