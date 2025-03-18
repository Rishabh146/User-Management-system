import JWT from 'jsonwebtoken'
import userModels from '../models/userModels.js';

export const requireSignIn=async(req,res,next)=>{
    try {
        const decode=JWT.verify(req.headers.authorization, process.env.JWT_SECRET)
        req.user=decode
        next();
    } catch (error) {
        console.log("Error in the jsonwebtoken",error)
    }
}

export const isAdmin= async(req,res,next)=>{
    try {
        const user= await userModels.findById(req.user._id)

        if(user.role!==1){
            res.status(401).send({
                success:false,
                message:"unothrized User",
                error
            })
        }
        else{
            next();
        }
        
    } catch (error) {
        console.log("error in autorization:", error)
        res.status(401).send({
            success:false,
            message:"error in the authorization"
        })
    }
}