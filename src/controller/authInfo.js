import {Profile, User} from "../model/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";




const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
      // Check if the user already exists
      const userExists = await User.findOne({ email });

      if (userExists) {
          return res.status(400).json({ message: "User already exists" });
      }

      // Validate email format
      if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
          return res.status(400).json({ message: "Invalid email" });
      }

      // Create a new Profile document
      const profile = await Profile.create({
          companyName: req.companyName, // Add any additional profile fields here
          address: req.address,
          phoneNo: req.phoneNo,
          plan: req.plan,
          logo: req.logo,
      });

      // Create a new User and associate it with the Profile
      const user = await User.create({
          username,
          email,
          password,
          profile: profile._id, // Store the Profile's _id in the user's profile field
      });

      // Return the response
      res.status(201).json({
          message: "User created successfully",
          user: {
              _id: user._id,
              username: user.username,
              email: user.email,
              password: user.password,
              profile: profile, // Return the entire profile document if needed
          },
      });
  } catch (error) {
      console.error("Error creating user and profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};


// const signup = async (req, res) => {
//     const { username, email, password} = req.body;

//     const userExists = await User.findOne({ email })  

//     if(userExists) {
//      return res.status(400)
//         .json({ message:"User already exists"})
//     }
//     if (email.indexOf("@") === -1) {
//          res.status(400).json({ message: "Invalid email"});
//     }
//     if (email.indexOf(".") === -1) {
//          res.status(400).json({ message: "Invalid email"});
//     }

//     const user = await User.create({ 
//         username,
//         email,
//         password,
     
//     });

//     if(user){
//         res.status(201).json({ message: "User created successfully", user,
//         _id: user._id,
//         username: user.username,
//         email: user.email,
//         password: user.password,
     
//       })
//     }
// }

const signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
      return res.status(404).json({ message: "Invalid credentials" });
  }

  try {
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(401).json({ error: "Invalid credentials" });
      } else {
          bcryptjs.compare(password, user.password).then(function (isMatch) {
              if (isMatch) {
                  const maxAge = 3 * 606 * 60;
                  const token = jwt.sign(
                      { id: user._id, email },
                      process.env.jwt_secret_key,
                      { expiresIn: maxAge }
                  );

                  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
                  res.status(201).json({ message: "Login successful", userId: user._id, token });
              } else {
                  res.status(400).json({ error: "Incorrect password" });
              }
          });
      }
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
  }
};


// const signIn = async (req, res) => {
//     const {email, password} = req.body;

//    if (!email && !password) {
//     return res.status(404).json({ message: "Invalid credentials"})
//    }
//     const isMatch = await User.findOne({email}) 

//     if(!isMatch) {

//         return res.status(401).json({ error:"Invalid credentials"});

//     }else {
//      bcryptjs.compare(password, isMatch.password).then(function (isMatch) {
//          if(isMatch) {
//             const maxAge = 3 * 606 * 60;
//             const token = jwt.sign(
//                 { id: isMatch._id, email },
//                 process.env.jwt_secret_key,
//                 { expiresIn: maxAge}
//             );

//             res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000})
//             res.status(201).json({ message: "Login succesful", isMatch, token})
//          } else {
//           res.status(400).json({ error: "Incorrect password"});
//          }
//        })
//     }
// }

const getUsers = async (req, res) => {
   
    const users = await User.find({}).populate('profile')
    res.json(users)
}

const getUserById = async (req, res) => {
    const user = await User.findById(req.params.id)
    if(user) {
        res.json(user)
    } else {
        res.status(400).json({ message: "User not found"})
    }
}


const forgotPassword = async (req, res) => {
    const {email} = req.body;
    User.findOne({email: email})
    .then(user => {
        if(!user) {
            return res.send({ Status: "User not found"})
        }
       const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})

       var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user:"olusolatemitayo656@gmail.com",
          pass: process.env.pass
        }
      });
      
      var mailOptions = {
        from: 'youremail@gmail.com',
        to: user.email,
        subject: '234Web Receipt Reset password Link',
        text:`Click the link to reset Your password https://receipt-6j94.onrender.com/api/auth/resetPassword/${user._id}/${token}`
      };
      
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
           res.status(200).json({ message: "success"})
        }
      }); 
    })
   // const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
    
  
}

const resetPassword = async (req, res) => {
    const {id, token} = req.params
    const {password} = req.body

    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
           bcryptjs.hash(password, 10)
           .then(hash => {
             User.findByIdAndUpdate({_id: id}, {password: hash})
             .then(u => res.send({Status: "Success"}))
             .catch(err => res.send({Status: err}))
           })
            .catch(err => res.send({Status: err}))
        }
    })
} 

export {signup, signIn,getUsers, getUserById, forgotPassword, resetPassword}




