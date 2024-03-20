import  Express, { response }  from "express";
import { Quest } from "../models/quests_models.js";
import {} from 'dotenv/config.js';

const router = Express.Router();

router.post("/getusersquests",async (req,res)=>{
    const {id} = req.body;
    const allquests = await Quest.find({userid:id});
    if(allquests){
        res.json({allquests});
    }else{
        res.send("no quests");
    }
    return;
});

router.post("/delete",async (req,res)=>{
    const {id,questName} = req.body;
    const One = await Quest.findOneAndDelete({userid:id,questname:questName});
    if(One){
        res.send("Deleted")
    }else{
        res.send("Error")
    }
    return;

});
router.post("/newquest",async (req,res)=>{
    const{QuestName,QuestGoal,QuestProgress,QuestSubQuests,QuestLevels,Userid,Timeblockindexs,Description,Log,FinishedStatus,Reward,QuestDayley} = req.body;
    
    //transform QuestSubQuests from array of just names to array of arrays of name and whether they are finishd or not aka bool
    let subquests = new Array();
    for(let i = 0; i < QuestSubQuests.length ; i++){
        const subquesttext = QuestSubQuests[i];
        const subquest = {
            quest:subquesttext,
            state:false
        }
        subquests.push(subquest)
    }
    
    const data ={
        questname:QuestName,
        questGoal:QuestGoal,
        questProgress:QuestProgress,
        questSubQuests:subquests,
        questLevels:QuestLevels,
        userid:Userid,
        timeblockindexs:Timeblockindexs,
        description:Description,
        log:Log,
        finished:FinishedStatus,
        reward:Reward,
        dayley:QuestDayley,
    }
    
    //check if exist
    const existingQuest = await Quest.findOne({questname:QuestName,userid:Userid});
    if(existingQuest){
        res.send("quest exist");
        return;
    }
    

    //create
    const newQuest = await Quest.create(data);
    if(newQuest){
        res.send("created")
    }else{
        res.send("quest not made")
    }
    return;
})
router.post("/deletequest",async (req,res)=>{
    const{questname,id,index} = req.body;
    const data ={
        questname:questname,
        userid:id,
        timeblockindex:index,
    }
    const deletedQuest = await Quest.findOneAndDelete(data);
    if(deletedQuest){
        res.send("removed");
    }else{
        res.send("error removing");
    }
    return;
});

router.post("/updatequest",async(req,res)=>{
    const{QuestName,QuestGoal,QuestProgress,QuestSubQuests,Userid,Timeblockindexs,Description,Log,FinishedStatus,Reward,DayleyDate} = req.body;
    
    //transform QuestSubQuests from array of just names to array of arrays of name and whether they are finishd or not aka bool
    const data ={
        questname:QuestName,
        questGoal:QuestGoal,
        questProgress:QuestProgress,
        questSubQuests:QuestSubQuests,
        userid:Userid,
        timeblockindexs:Timeblockindexs,
        description:Description,
        log:Log,
        finished:FinishedStatus,
        reward:Reward,
        dayleyDate:DayleyDate,
    }
    console.log(data)
    const findData ={
        questname:QuestName,
        questGoal:QuestGoal,
        userid:Userid,
    }
    const UpdatedQuest = await Quest.findOneAndUpdate(findData,data);
    if(UpdatedQuest){
        res.send("updated");
    }else{
        res.send("error updating");
    }
    return;
})

router.post("/addquesttoblock",async(req,res)=>{
    const{Id, QuestName, NewIndexOfBlcok} = req.body;

    const findData = {
        userid:Id, 
        questname:QuestName,
    }
    const ExistingQuest = await Quest.findOne(findData);
    console.log(ExistingQuest.timeblockindexs);

    let NewIndex = ExistingQuest.timeblockindexs;
    NewIndex.push(NewIndexOfBlcok);
    console.log(NewIndex);
    const UpdatedQuest = await Quest.findOneAndUpdate(findData,{timeblockindexs:NewIndex})




    res.json(UpdatedQuest);
    return;
})
export default router;