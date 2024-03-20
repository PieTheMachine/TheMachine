import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        //id is handeld auto
        name:{
            type:String,
            required:true,   
        },
        psw:{
            type:String,
            required:true,   
        },
        Gold:{
            type:Number,
            required:false,   
        },
        SciFi:{
            type:Number,
            required:false,   
        }
    },{
        timestamps:true,
    }
)

export const User = mongoose.model("user",userSchema);