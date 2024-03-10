import axios from "axios";
import { useEffect,useState } from "react";

function All_users() {

    const [data,setdata] = useState([]);
    useEffect(()=>{

        const targetPath = import.meta.env.VITE_server + "/users/allusers"
        axios.get(targetPath,{withCredentials:true})
        .then((res)=>{
            console.log(res.data["allusers"]);
            setdata(res.data["allusers"])
        })
    },[])

  return (
    <div>
        <h1> all users</h1>
        {
            data.map((user,index) => {
                return(
                <div key={index}>
                    <h1>{user.name}</h1>
                    <h1>{user.psw}</h1>
                </div>
                );
            })
        }
    </div>
  )
}

export default All_users;