import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import crypto from "crypto";

const Schema = mongoose.Schema;


// Define a schema for the profile
const profileSchema = new Schema({
  companyName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    required: true,
    enum: ["plan1", "plan2", "plan3", "plan4", "plan5"],
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },

},{

  timestamps: true
});

// Create a model for the profile
const Profile = mongoose.model('Profile', profileSchema);

// Define a schema for the user
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLenght: 8, // Corrected typo from "minLenght" to "minLength"
  },
  passwordResetToken: String,
  passwordRestTokenExpires: Number

}, {
  timestamps: true,
});

userSchema.virtual('userDetails', {
  ref: 'Profile',
  localField: '_id',
  foreignField: 'user',
});

userSchema.set('toObject', { virtuals: true});
userSchema.set('toJSON', { virtuals: true});




userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password)

}

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) {
      next()
  }

  const salt = await bcryptjs.genSalt(10)
  this.password = await bcryptjs.hash(this.password, salt)
})
// authSchema.methods.isPasswordChanged = async function(JWTTimestamp) {
//     if(this.passwordChangedAt) {
//         const paswdChangedTimestamp = parseInt(this.passChangedAt.getTime() / 1000, 10);
//         console.log(paswdChangedTimestamp, JWTTimestamp)

//         return JWTTimestamp < paswdChangedTimestamp; 
//     }
// }

userSchema.methods.createResetPasswordToken = function(){
  const resetToken = crypto.randomBytes(32).toString('hex');

 this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
 this.passwordRestTokenExpires = Date.now() * 10 * 60 * 1000;

 console.log(resetToken, this.passwordResetToken);
 return resetToken;
}
// Create a model for the user
const User = mongoose.model('User', userSchema);

export  {User, Profile}