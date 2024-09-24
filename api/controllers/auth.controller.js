import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req,res,next) => {
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10); //passing the salt number, which is the number of round for creating the salt, salt is just a hash number or variable
    //  which is going to combined with our password and make it encrypted.
    const newUser = new User ({
        username,
        email,
        password: hashedPassword
    });
    try {
        await newUser.save();
        res.status(201).json(
        'User created successfully!'
    );
    } catch (error) {
       // next(errorHandler(550, 'error form the function'));   custom handling errors using a function
       next(error)
    }
    
};