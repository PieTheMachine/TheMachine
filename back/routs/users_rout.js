import Express from "express";
import { User } from "../models/users_models.js";


import {} from 'dotenv/config.js'

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import auth from "../Mid/auth.js"


const router = Express.Router();

//get data of loged in user
router.get('/allusers', async (requst,response)=>{
    const allusers = await User.find({}); //get all users
    if(allusers){
        response.json({
            allusers
        });
    }else{
        response.send("notfound")
    }
    
});
//get all users only if loged in(it will run function auth then the next function witch is async bla bla)
router.get('/userdata', auth, async (requst,response)=>{
    console.log("userdata");
    await requst;
    const name = requst.username;
    const id = requst.userid;
    const userdata = {
        name,id
    }
    console.log(userdata)
    return response.status(200).json({
        userdata
    });
})

//get user
// : to set it as params?
router.get('/:id', async (requst,response)=>{

    const {id} = requst.params;
    const user_by_id = await User.findById(id); 
    return response.status(200).json(
        user_by_id
    );
})


//delete user
router.delete('/:id',async (requst,response)=>{
    const {id} = requst.params;
    const result = await User.findByIdAndDelete(id);
    if(!result){
        return response.status(404).json({message:"wait what?"});
    }
    return response.status(200).json({message:"GG"});
});

// update a user
router.put('/:id', async (requst,response)=>{
    const {id} = requst.params;
    //requst.body == the data that we got from the requst witch is like $_POST and body is the data it self
    const result = await User.findByIdAndUpdate(id,requst.body);
    if(!result){
        return response.status(404).json({message:"no user found with that id"});
    }
    return response.json({message:"allgood"});
})


//Login
router.post('/login', async (requst,response) =>{
    
    console.log("TEstLogin");
    const{name,psw} = requst.body;
    
    if(!name || !psw){
        return response.json( {errorMessage: "no psw or name"});
    }else{
        //async makes you abil to use await
        const userExist = await User.findOne({name:name});
        if(userExist){
            //check psw
            const check = await bcrypt.compare(psw,userExist.psw);
            if(check){

                //token think of it as a token or medel thet tells the server hey I am me
                //sign the token
               
                const token = await jwt.sign({user_id:userExist._id,user_name:userExist.name},process.env.JWT_Secreat);
                // send the token in a HTTP cookie  
                

                return response.cookie('token',token).send();
            }   
            console.log(check);
            return response.json({Message: "rong psw"});
        }else{
            return response.json( {errorMessage: "no existing user with that name"});
        }
    }
    
})
//signup
//get reads top bar , post reads hidden data in top bar
router.post('/', async (requst,response)=>{
    try{
        const{name,psw} = requst.body;
        if(!name||!psw){
            return response.json({errorMessage:"fill the filds"})
        }
        const salt = await bcrypt.genSalt();
        const hashedpsw = await bcrypt.hash(requst.body.psw,salt);

        const newUser = {
            name:requst.body.name,
            psw:hashedpsw,
        };


        const user = await User.create(newUser);
        return response.status(201).send(user);

    }catch(error){
        console.log(error.message);
        response.status(500).send("GG"+{message: error.message});
    }
});

//logoutout
router.get('/logout', async (req,res)=>{
    
    res
    res.cookie("token","",{
        httpOnly:true,
        expires: new Data(0)
    }).send("loged");

});



export default router;