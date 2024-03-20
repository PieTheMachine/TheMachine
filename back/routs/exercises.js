import Express  from "express";
import { Exercise } from '../models/exercise_models.js';
import {} from 'dotenv/config.js'

const router = Express.Router();

router.post("/make", async (req,res)=>{
    //get data + must be same name
    const{exName,exCatgory,id} = req.body;
    console.log(exName);
    console.log(exCatgory);
    console.log(id);
    const newExercise ={
        name:exName,
        catgory:exCatgory,
        userId:id,
    };
    //check if exist
    const exist = await Exercise.find({name:exName,userId:id});
    if(exist.length > 0){
        res.send("alrady exist");
    }else{
        const createdExercise = await Exercise.create(newExercise);
        res.json(createdExercise);
    }
    return;
    
})
router.post("/user",async (req,res)=>{
    const {Userid} = req.body;
    const AllExercisesForThisUser = await Exercise.find({userId:Userid});
    if(AllExercisesForThisUser.length > 0){
        res.json(AllExercisesForThisUser);
    }else{
        res.send("User got no exercises");
    }
    return;
})
export default router;