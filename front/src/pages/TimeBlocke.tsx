import { useState,useEffect } from "react";
import '../root.css'
import './grid.css'
import x from '../assets/x_black.svg'

import axios from "axios";


function TimeBlocke() {

    const hours = 24;
    const howmuchisablock = 1.5;
    const blokes = hours / howmuchisablock;

    let id ="";

    const [show,setshow] = useState(false);
    const [blockesloaded,setblockesloaded] = useState(false);

    //Get items from db
    function ShowBlockDetails(){
      setshow(!show);
    }
    //create block
    const [index,setindex] = useState("");
    const [title,settitle] = useState("");
    const [text,settext] = useState("");
    const [level,setlevel] = useState("");



    //let DBBlock =[0];
    const [DBBlock,setDBBlock] = useState([]);


    async function CreateBlcok(){
      await GetuserData();
      const data = {
        index,title,text,level,id,
      }
      axios.post(import.meta.env.VITE_server+"/timeblock/create",data)
      .then(()=>{
        location.reload();
      })
    }
    //Get user's data
    //get data stuff

    useEffect(()=>{
        GetuserData();
    },[])
  
    async function GetuserData(){
    
        const server = import.meta.env.VITE_server+"/users/userdata";
        
        const res = await axios.get(server,{withCredentials:true});
        const data = res.data["userdata"];
        if(res){
            id = data["id"];
            GetBlockesOfUser();
        }
        return data["id"];
    }

  async function GetBlockesOfUser() {
    const data={
      id,
    }
    const server = import.meta.env.VITE_server+"/timeblock/myblocks";
    const result = await axios.post(server,data,{withCredentials:true});
    if(result.data['users_Blockes'].length > 0){
      setDBBlock(result.data['users_Blockes']);
      
      setblockesloaded(true);
    }else{
      setblockesloaded(true);
    }
    console.log(result);
  }


  //#region blocks and blocks

  //item = Blcok  
  function Items(){
    let list = [];
    let i = 0;

    
      for(i = 0;i < blokes;i++){
        const data = IfExistThenGiveData(i);
        //data[0] = title
        //data[1] = text
        //data[2] = level
        list.push(<div className="🔰Grid-item" id={i.toString()} onClick={ShowBlockDetails} key={i}>
          <h4>{data[0]}</h4>
          <h4>{data[1]}</h4>
          <h4>Level: {data[2]}</h4>
          <h4>{GetmeNumber(i)}</h4>
          <input className="📺full 🎩OnTopCover indexsaver" type="text" onFocus={(e) => (setindex(e.target.value), settitle(data[0].toString()),settext(data[1].toString()), setlevel(data[2].toString()))} value={i}/>
        </div>);
      }
    
    return list;
  }

  //Get number
  function GetmeNumber(i = 0){
    //first
    const first = i * howmuchisablock;
    const x = Math.floor(first);
    let xString = x.toString();
    if(first % 1 > 0){
      xString+=":30";
    }else{
      xString+="h";
    }

    //second
    const second = (i+1) * howmuchisablock;
    const y = Math.floor(second);
    let yString = y.toString();
    if(second % 1 > 0){
      yString+=":30";
    }else{
      yString+="h";
    }

    const fromto = xString + " - " +  yString;
    return fromto;
  }

  function IfExistThenGiveData(i = 0){
    let y = 0;
    let title= "";
    let text= "";
    let level= 0;

    for(y = 0; y < DBBlock.length;y++){
      if(DBBlock[y]['index'] === i){
        title = DBBlock[y]['title'];
        text = DBBlock[y]['text'];
        level = DBBlock[y]['level'];
        
        break;
      }
      else{
        title = 'empty time';
        text = "";
        level = 0;
      }
    }

    return [title,text,level,];
  }
  //#endregion 
  return (
    <div>
      <h1>Time Blokes</h1>
      <div className="🧮Grid">
        {
          blockesloaded ? Items():null
        }
        {
          show ? 
            <div id="📄details" className="📄details">
            <div className="pos_reltive 📺full">
              <button className="❌bn" onClick={ShowBlockDetails}><img className="❤redimg" src={x} alt="" /></button>
              <div className="ℹInfoHolder">
                <input type="text" placeholder="title" value={title} onChange={(e) => settitle(e.target.value)}/>
                <input type="text" placeholder="text" value={text} onChange={(e) => settext(e.target.value)}/>
                <input type="number" placeholder="level" max={5} value={level} onChange={(e) => setlevel(e.target.value)}/>
                <input type="submit" onClick={CreateBlcok} placeholder="index" value={"submit"}/>
              </div>
            </div>
          </div> 
          :null
        }
        
      </div>
      
    </div>
  )
}

export default TimeBlocke;