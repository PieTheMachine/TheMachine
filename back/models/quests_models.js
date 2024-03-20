import mongoose from "mongoose";

const quest = mongoose.Schema(
   {
   questname:{type:String,required:true,},
   //questimagelinkinpublic:{type:String,required:true,}, not for now
   questGoal:{type:String,required:true,},
   questProgress:{type:String,required:true,},
   questSubQuests:{type:Array,required:true,default:[],},
   questLevels:{type:Array,required:false,default:[],},//set it to false required after finish
   userid:{type:String,required:true,},
   timeblockindexs:{type:Array,required:true,default:[],},
   description:{type:String,required:false,},
   log:{type:String,required:false,},
   finished:{type:Boolean,required:true,},
   reward:{type:String,required:false,},
   dayley:{type:Boolean,required:false,default:false,},
   dayleyDate:{type:Number,required:false,},
   }
)
export const Quest = mongoose.model("Quest",quest);