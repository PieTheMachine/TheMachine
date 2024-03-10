import mongoose from "mongoose";

const TimeBlockScheme = mongoose.Schema(
    {
        index:{
            type:Number,
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        text:{
            type:String,
            required:true,
        },
        level:{
            type:Number,
            required:true,
        },
        user_id:{
            type:String,
            required:true,
        }
    }
)
export const Block = mongoose.model("Block",TimeBlockScheme);