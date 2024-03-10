import Express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import cookieParser from "cookie-parser";

import users_routs from "./routs/users_rout.js"
import timeblock from "./routs/time_bloke.js"
import exercises from "./routs/exercises.js"

const Port = process.env.PORT || 5555;

const app = Express();
app.use(Express.json());//check if the request has json data and allowes you to read them
app.use(cors({
    origin:"http://localhost:5173",//local how to make it server?
    credentials: true,
}));
app.use(cookieParser());//check if the request has cookies and allowes you to read them

app.get('/',(req,res)=>{
    return res.send("wow, how did you get here?");
});

app.use('/users',users_routs);
app.use('/timeblock',timeblock);
app.use('/exercises',exercises);
//db
mongoose
    .connect(process.env.MongoDB)
    .then(() => {
        //if conected to db
        console.log("connected");
        //add local port
        app.listen(Port, () => {
            console.log(`g: ${Port}`);
        });
    })
    .catch((error) =>{
        //if not connected to db
        console.error(error);
    })