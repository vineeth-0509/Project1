// import User from '../models/user.model.js';
// import bcryptjs from 'bcryptjs';
// import { errorHandler } from '../utils/error.js';
// import jwt from "jsonwebtoken"
// import dotenv from "dotenv";
// dotenv.config()



// export const signup = async (req, res, next) => {
//   const { username, email, password } = req.body;
//   const hashedPassword = bcryptjs.hashSync(password, 10);
//   const newUser = new User({ username, email, password: hashedPassword });
//   try {
//     await newUser.save();
//     res.status(201).json('User created successfully!');
//   } catch (error) {
//     next(error);
//   }
// };


// export const signin = async (req,res,next) => {
//   const {email , password} = req.body;
//   try {
//     const validUser = await User.findOne({email});
//     if (!validUser) return next(errorHandler(404, 'User not found!'));

//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if(!validPassword) return next(errorHandler(401, 'Wrong Credentials!'));

//     const token = jwt.sign({
//       id: validUser._id,
//     },process.env.JWT_SECRET)
//     res.cookie('access_token',token,{ httpOnly: true}).status(200).json(validUser);

//     console.log("JWT_SECRET: ", process.env.JWT_SECRET);

//   } catch (error) {
//     next(error);
//   }
// }



import dotenv from 'dotenv';
dotenv.config();

import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json('User created successfully!');
  } catch (error) {
    next(error);
  }
};


export const signin = async (req, res, next) => {
  console.log("JWT_SECRET:", process.env.JWT_SECRET); // Debugging

  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found!'));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Wrong Credentials!'));

    const token = jwt.sign(
      { id: validUser._id },
      process.env.JWT_SECRET || 'fallback-secret-key', // Fallback in case env var is undefined
       );


       //the below line is used to hide the password not to get the hashed password from the validUser by we doing res.status(200).json(validUser)
     //The variable rest will contain all the other fields from validUser._doc, excluding password.
    const {password: pass, ...rest} = validUser._doc;
    res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
 

