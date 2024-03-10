import axios from "axios";
import { useState } from "react";
function Signup(){

    const[name,setname] = useState('');
    const[psw,setpsw] = useState('');
    const[pswC,setpswC] = useState('');

    const Signupf = ()=>{
        console.log(import.meta.env.VITE_server+"/users");
        const data ={
            name,psw
        }
        axios.post(import.meta.env.VITE_server+"/users",data).then((response)=>{
            console.log(response);
        })
    }

    return(
        <div>
            <h1>📝Sign up</h1>
            <input type="text" value={name} placeholder="name" onChange={(e) => setname(e.target.value)}/>
            <input type="text" value={psw} placeholder="psw" onChange={(e) => setpsw(e.target.value)}/>
            <input type="text" value={pswC} placeholder="pswC" onChange={(e) => setpswC(e.target.value)}/>
            <button onClick={Signupf}>sign up</button>
        </div>
    )
}
export default Signup;  