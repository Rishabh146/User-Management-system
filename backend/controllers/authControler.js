import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from 'jsonwebtoken'

export const registerController=async(req,res)=> {
    // function body
    try {
        const {name, email, password, age, gender}=req.body;
        if(!name){
            res.send({error:"name is required"});
        }
        if(!email){
            res.send({error:"email is required"});
        }
        if(!password){
            res.send({error:"password is required"});
        }
        const existingUser= await userModels.findOne({email})
        if(existingUser){
            res.status(500).send({
                success:false,
                message:"User Already Exist Please Login"
            })
        }

        const hashedPassword= await hashPassword(password)
        const user= await new userModels({name, email, age, gender, password:hashedPassword}).save();
        console.log("user",user);
        
        res.status(200).send({
            success:true,
            message:"User Register Sucessfully",
            user
        })
        
    } catch (error) {
        console.log("error in the Registration",error);
        res.status(500).send({
            sucess:false,
            message:"error in the registration",
            error
        })
    }
  }


  
export const loginController=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            res.status(404).send({
                success:false,
                message:"invalid email or password"
            })
        }
        const user=await userModels.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User has not Registered"
            })
        }
        const match=await comparePassword(password, user.password)
        if(!match){
            res.status(200).send({
                success:false,
                message:"invalid Login Credential"
            })
        }
        const token=await JWT.sign({_id:user._id}, 'JHDHKSDJJNjjndndsj97373' ,{expiresIn:'7d'})
        res.status(201).send({
            success:true,
            message:"USer Login Successfully",
            user:{
                name:user.name,
                email:user.email,
                gender:user.gender
            },
            token
        })

    } catch (error) {
        console.log("error in login",error)
        res.status(500).send({
            success:false,
            message:"error in login",
            error
        })
    }
  }

  export const getAllUsersController = async (req, res) => {
    try {
      const users = await userModels.find({}, '-password'); // exclude password for security
  
      console.log("Fetched Users:", users); 
  
      res.status(200).send({
        success: true,
        message: "Fetched all users successfully",
        users,
      });
    } catch (error) {
      console.log("Error fetching users", error);
      res.status(500).send({
        success: false,
        message: "Error fetching users",
        error,
      });
    }
  }
  

  export const testMiddleware=(req,res)=>{
      return res.send("Protected Route")
  }