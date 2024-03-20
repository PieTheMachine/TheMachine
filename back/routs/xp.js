import  Express  from "express";
import { Xp } from "../models/xp_models.js";
import {} from 'dotenv/config.js';

const router = Express.Router();

router.post("/getall",async (req,res)=>{
    const {xp_user_id} = req.body;
    const data ={
        xp_user_id,
    }
    const allXps = await Xp.find(data);
    if(allXps){
        res.json(allXps);
    }else{
        res.send("not found");
    }
    
})
router.post("/recivereward",async(req,res)=>{
    const {LocalquestRewardsXp,ID} = req.body;
    const Rewards = LocalquestRewardsXp;
    console.log(req.body)
    console.log(ID)
    if(Rewards[0]){
        for(let i = 0; i < Rewards[0].length;i++){
            
            const LevelData = await Xp.findOne({xp_name:Rewards[0][i],xp_user_id:ID})
            let xpFullamount = Number(Rewards[1][i]) + Number(LevelData.xp_now_amount);
            let MaxToUpgrad = Number(LevelData.xp_now_max_amount);
            let level = Number(LevelData.xp_level)

            while(Number(xpFullamount) > MaxToUpgrad){
                level++;
                xpFullamount -= MaxToUpgrad;
                MaxToUpgrad = Math.floor(MaxToUpgrad * LevelData.xp_multiplier);
            }
            const Newdata ={
                xp_level:level,
                xp_now_amount:xpFullamount,
                xp_now_max_amount:MaxToUpgrad,
            }
            const UpdatedLevel = await Xp.findOneAndUpdate({xp_name:Rewards[0][i],xp_user_id:ID},Newdata);
            res.json(UpdatedLevel);

            return;
            //
        }
    }
    res.send("No rewards were added to this quest");

    return;
})
router.post("/createneworupdate",async (req,res)=>{
    const {xp_name,xp_level,xp_now_amount,xp_now_max_amount,xp_multiplier,xp_user_id} = req.body;

    let xp_levelServer = xp_level;
    if(xp_level === ""){
        xp_levelServer = "0";
    }

    let xp_now_amountServer = xp_now_amount;
    if(xp_now_amount === ""){
        xp_now_amountServer = "0";
    }
    const data ={
        xp_name:xp_name,
        xp_level:xp_levelServer,
        xp_now_amount:xp_now_amountServer,
        xp_now_max_amount:xp_now_max_amount,
        xp_multiplier:xp_multiplier,
        xp_user_id:xp_user_id,
    }
    console.log(data)
    const findData ={
        xp_name:xp_name,
        xp_user_id:xp_user_id
    }

    
    

    const ExisstingXp = await Xp.findOne(findData);

    if(ExisstingXp){
        console.log("exists Updating");
        const Updated = await Xp.findOneAndUpdate(findData,data);
        res.json(Updated)
        return;
    }else{
        console.log("New Creating");
            console.log(data);
            const NewXp = await Xp.create(data);
            res.json(NewXp);
    }
    
});
export default router;