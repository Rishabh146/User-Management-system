
import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    gender:{
        type:String
    },
    age:{
        type:Number
    },
    role:{
        type:String,
        enum:['user','admin']
    }

},
{timestamps:true});
export default mongoose.model('users',userSchema);