import axios from "axios";
import { useState } from "react";
import "./Log.css"
import { useNavigate } from "react-router-dom";

function Signup() {

    const navigate = useNavigate()
    const [name, setname] = useState('');
    const [psw, setpsw] = useState('');

    const Signupf = () => {

        if (name.length > 5 && psw.length > 5) {
            const data = {
                name, psw
            }
            axios.post(import.meta.env.VITE_server + "/users", data).then((response) => {
                console.log(response);
                navigate("/login");
            })
        } else {
            console.log("short");
        }

    }

    return (
        <div className="💪Flex 💪C">
            <div className="🪓🍽LogMenu GapCool 💪Flex 💪C">
                <h1>📝Sign up</h1>
                <input className="📱TextInput" type="text" minLength={5} value={name} placeholder="name" onChange={(e) => setname(e.target.value)} />
                <input className="📱TextInput" type="text" minLength={5} value={psw} placeholder="psw" onChange={(e) => setpsw(e.target.value)} />
                <button className='✅submit' onClick={Signupf}><span>sign up</span></button>
            </div>

        </div>
    )
}
export default Signup;  