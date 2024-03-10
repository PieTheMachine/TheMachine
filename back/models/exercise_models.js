import mongoose from "mongoose";

const exercise = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        catgory:{
            type:String,
            required:true,
        },
        userId:{
            type:String,
            required:true,
        }
    }
)
export const Exercise =  mongoose.model("Exercise",exercise);