import Express from "express";
import {} from 'dotenv/config.js'



const router = Express.Router();

router.get("/t", async (req,res)=>{
    console.log("Test");
    res.json("Test");
})
export default router;