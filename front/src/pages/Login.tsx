import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import "./Log.css"

function Login() {
  const [name, setname] = useState('');
  const [psw, setpsw] = useState('');
  const navigate = useNavigate();

  function loginF() {
    console.log("loging...");
    const data = {
      name, psw
    }
    console.log(data);
    axios.post(import.meta.env.VITE_server + "/users/login", data, { withCredentials: true })
      .then((res) => {
        console.log(res.data["user_id"]);
        if (res.data["user_id"]) {
          document.cookie = "user_name=" + name;
          document.cookie = "user_id=" + res.data["user_id"];
          document.cookie = "token=" + res.data["Token"];
          document.cookie = "Gold=" + res.data["Gold"];
          document.cookie = "SciFi=" + res.data["SciFi"];
          navigate("/mybook")
        }
      })
  }
  return (
    <div className=" 💪Flex 💪C">
      <div className="🪓🍽LogMenu GapCool 💪Flex 💪C">
        <h1>🎲Log in</h1>
        <input className="📱TextInput" type="text" placeholder="name" onChange={(e) => { setname(e.target.value) }} />
        <input className="📱TextInput" type="text" placeholder="psw" onChange={(e) => { setpsw(e.target.value) }} />
        <button className='✅submit' onClick={loginF}><span>log in</span></button>
      </div>

    </div>
  )
}

export default Login;