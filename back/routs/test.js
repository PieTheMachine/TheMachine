import Express from "express";
import {} from 'dotenv/config.js'



const router = Express.Router();

router.get("/t", async (req,res)=>{
    const G = 5+5;
    console.log("Test");
    res.json(G+"Test");
})
export default router;