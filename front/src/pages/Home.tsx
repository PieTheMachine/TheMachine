import axios from "axios";
function home() {
  function Testit(){
    console.log("ss")
    axios.get(import.meta.env.VITE_server+"/test/t").then((res)=> console.log(res))
  }
  return (
    <div>
      Under Building
      <button onClick={Testit}>testss</button>
    </div>
  )
}

export default home;