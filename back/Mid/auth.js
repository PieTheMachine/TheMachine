import  jwt  from "jsonwebtoken";
import {} from 'dotenv/config';
function auth(req,res,next){

    try{
        const token = req.cookies.token;
        if(!token) return res.state(401).json({errorMessage:"I dont know you🤚, where is your token?????"});


        const verified = jwt.verify(token,process.env.JWT_Secreat);//jwt.verfy will decode the tokens payload aka data and store it on verfied
        // data saved on const verified console.log(verified);
        if(verified){
            console.log("user is on session and loged in");
        }// why is there no els because verify will send error if not same and will catch it wtih catch(err)

        //this will send the users id as the previuse req to the function after the auth so we can use it to know who is sending 
        //the req
        req.userid = verified.user_id;
        req.username = verified.user_name;

        next();//like return but it allowe to move on to the next function
        
        
    }catch(err){
        console.log("u got no cookies");
        res.state(401).send("u got no cookies");
        return;
    }
}
export default auth;