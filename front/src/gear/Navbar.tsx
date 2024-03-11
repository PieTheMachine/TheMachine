import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import '../root.css';
import './navbar.css';

function Navbar(){

    //get data stuff

    const [loged,setloged] = useState(false);
    const [secounds,setsecounds] = useState(0);
    const timeout =2000;
    
    useEffect(()=>{
        const Interval = setInterval(()=>{
            setsecounds((secounds)=> secounds + 1);
            
        },timeout)
        
        console.log(secounds);
        console.log("Checking");
        CheckifLogedIn()
        return () => clearInterval(Interval);
    });
    const [user_name,setuser_name] = useState('');
    async function CheckifLogedIn(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        const user_name = document.cookie.replace(/(?:(?:^|.*;\s*)user_name\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        if(token){
            //userdata is the name of the array inside the response json object
            setloged(true);
            setuser_name(user_name);
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
                loged ? <Link className='💪Flex 💻link' to={"/mybook"}>📘<h3 className='🧊GradientText'>{user_name}'s book</h3></Link>:null
            }
        </div>
    )
}
export default Navbar;