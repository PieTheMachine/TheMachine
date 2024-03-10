import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import '../root.css';
import './navbar.css';



function Navbar(){

    //get data stuff

    const [loged,setloged] = useState(false);
    const timeout =1000;
    setTimeout(() => {
        GetuserData();
    }, timeout);
    async function GetuserData(){
    
        const server = import.meta.env.VITE_server+"/users/userdata";
    
        const res = await axios.get(server,{withCredentials:true});
        const data = res.data["userdata"];
        if(data){
            //userdata is the name of the array inside the response json object
            setloged(true);
            
        }else{
            setloged(false);
        }
    }
    return(
        <div className="Navbar">
            <Link className='💪Flex 💻link' to={"/home"}>🏡<h3 className='🧊GradientText'>home</h3></Link>
            <Link className='💪Flex 💻link' to={"/signup"}>📝<h3 className='🧊GradientText'>sign up</h3></Link>
            <Link className='💪Flex 💻link' to={"/login"}>🪓<h3 className='🧊GradientText'>log in</h3></Link>
            {
                loged ? <Link className='💪Flex 💻link' to={"/mybook"}>📘<h3 className='🧊GradientText'>My book</h3></Link>:null
            }
        </div>
    )
}
export default Navbar;