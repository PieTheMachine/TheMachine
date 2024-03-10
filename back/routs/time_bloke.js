import  Express  from "express";
import { Block } from "../models/time_blokes_models.js";
import {} from 'dotenv/config.js'



const router = Express.Router();

router.get("/all", async (req,res)=>{
    const allblockes = await Block.find({});
    res.json({allblockes});
})


router.post("/myblocks",async (req,res)=>{
    const {id} = req.body;
    const users_Blockes = await Block.find({user_id:id})
    res.json({users_Blockes});
});

router.post("/create", async (req,res)=>{

    const {index,title,text,level,id} = req.body;
    const newBlock ={
        index:index,
        title:title,
        text:text,
        level:level,
        user_id:id,
    };

    //check if block does not exist  
    const alrady_exist = await Block.find({index:index,user_id:id});
    if(alrady_exist.length > 0){
            //if exist then update
            
            const query ={index:index,user_id:id};
            const updated = await Block.findOneAndUpdate(query,newBlock);
            console.log("Updated : " + title);
            return res.send("updated");

            
    }else{
 
        
        console.log("Created new : " + title);
            
        const CreatedBlock = await Block.create(newBlock);
        res.send("created");
    }
    
     

})

export default router;