import bcryptjs from 'bcryptjs';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';
export const test = (req,res) =>{
    res.json({
        message:"Api route is working!",
    });
}

export const updateUser = async (req,res) => {
    if(req.user.id !== req.params.id) return createNextState(errorHandler(401,"You can only update your own account!"))
        try {
            if(req.body.password){
                req.body.password = bcryptjs.hashSync(req.body.password, 10)
            }

            const updateUser = await User.findByIdAndUpdate(req.params.id,{
                $set:{   // $set is used to   update operations to specify which field should be updated.
                    username : req.body.username,
                    email: req.email,
                    password : req.password,
                    avatar: req.body.avatar,
                }
            }, {new: true}) //new true returns and save this updated user with the new information, not the previous one. 

            const {password,...rest} =updateUser._doc;
            res.status(200).json(rest);
        } catch (error) {
            next(error)
        }
}


export const deleteUser =async () => {
    if(req.user.id !== req.params.id) return next(errorHandler(401,'You can only delete yout own account'))
        try {
           await User.findByIdAndDelete(req.params.id);
           res.clearCookie('access_token');
           res.status(200).json('User has been deleted!');
        } catch (error) {
            next(error);
        }
}