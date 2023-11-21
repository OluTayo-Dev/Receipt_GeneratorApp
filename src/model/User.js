import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import crypto from "crypto";



// Define the profileSchema
const profileSchema = new mongoose.Schema({
    companyName: String,
    Address: String,
    phoneNo: String,
    plan: String,
    logo: String
    // Other profile fields
});

// Define the profile model
const Profile = mongoose.model('Profile', profileSchema);

// Define the userSchema with a reference to the Profile model
const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String
    },
    profile: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Profile'
    }],
    createdOn: {type: Date, default: Date.now }
}).pre('save', async function (next) {
   if (!this.isModified('password')) {

   }

   const salt = await bcryptjs.genSalt();
   this.password = await bcryptjs.hash(this.password, salt);

   next();
})

// Define the user model
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password)

}


// authSchema.methods.isPasswordChanged = async function(JWTTimestamp) {
//     if(this.passwordChangedAt) {
//         const paswdChangedTimestamp = parseInt(this.passChangedAt.getTime() / 1000, 10);
//         console.log(paswdChangedTimestamp, JWTTimestamp)

//         return JWTTimestamp < paswdChangedTimestamp; 
//     }
// }

// userSchema.methods.createResetPasswordToken = function(){
//   const resetToken = crypto.randomBytes(32).toString('hex');

//  this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//  this.passwordRestTokenExpires = Date.now() * 10 * 60 * 1000;

//  console.log(resetToken, this.passwordResetToken);
//  return resetToken;
// }

const User = mongoose.model('User', userSchema);

export {Profile, User}

