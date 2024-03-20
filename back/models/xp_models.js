import mongoose from "mongoose";

const xp = mongoose.Schema(
   {
    xp_name:{type:String,required:true,},
    xp_level:{type:String,required:true,},
    xp_now_amount:{type:String,required:true,},
    xp_now_max_amount:{type:String,required:true,},
    xp_multiplier:{type:Number,required:true,},
    xp_user_id:{type:String,required:true,},
   }
)
export const Xp = mongoose.model("XpLevel",xp);