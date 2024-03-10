import { useState  } from "react";
import axios from "axios";

function Login() {

  const [name,setname] = useState('');
  const [psw,setpsw] = useState('');

  function loginF(){
    const data ={
      name,psw
    }
    axios.post(import.meta.env.VITE_server+"/users/login",data,{withCredentials:true}).then((res)=>{
      console.log(res);
      location.reload();
    })
  }

  return (
    <div>
        <h1>🎲Log in</h1>
        <input type="text" placeholder="name" onChange={(e)=>{setname(e.target.value)}}/>
        <input type="text" placeholder="psw"onChange={(e)=>{setpsw(e.target.value)}}/>
        <button onClick={loginF}>log in</button>
    </div>
  )
}

export default Login;