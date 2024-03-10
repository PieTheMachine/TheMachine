import axios from "axios"
import { useState,useEffect } from "react"
import '../root.css'

function Exercise() {
    //important
    const [LoadedUser,setLoadedUser] = useState(false);


    //get user
    let Userid ='';
    const [StateId,setStateId] = useState('');
    useEffect(()=>{
        GetuserData();
    },[])
  
    async function GetuserData(){
    
        const server = import.meta.env.VITE_server+"/users/userdata";
        
        const res = await axios.get(server,{withCredentials:true});
        const data = res.data["userdata"];
        if(res){
            Userid = data["id"];
            setStateId(Userid);
            setLoadedUser(true);
            //so it will only load when we have a user
            GetExercisesForThisUser();
        }
        return;
    }
    
    //add exercise + save it with user id
    const server = import.meta.env.VITE_server;

    const [exName,setexName] = useState('');
    const [exCatgory,setexCatgory] = useState('');
    function Addnewex(){
        console.log("id State:" + StateId);
        const id = StateId;
        const data ={
            exName,exCatgory,id,
        }
        axios.post(server+"/exercises/make",data).then((res)=>{console.log("created" + res); location.reload();});
    }

    //get all exercises for this user
    //let ExData = new Array();
    const [ExData,setExData] = useState([])
    function GetExercisesForThisUser(){
        const data ={
            Userid,
        }
        
        axios.post(server+"/exercises/user",data)
        .then((res)=>{
            setExData(res.data);

            GenerateRandomExerciseSession();
        })
    }
    //generate random exercises
    let catgoryList = new Array();
    let ExerciseList = new Array();
    const [StateArray,setStateArray] = useState(['']);
    const [StateArrayEx,setStateArrayEx] = useState(['']);

    function clearData(){

        console.log("Cleard")
    }

    function GenerateRandomExerciseSession(){
        //clear list
        clearData();
        
        console.log(StateArray)
        console.log(StateArrayEx)
        //Get all exercises catgorys
        let i = 0;
        for(i=0;i<ExData.length;i++){
            if(catgoryList.includes(ExData[i]['catgory'])){

            }else{
                const newCatgory = ExData[i]['catgory'];
                catgoryList.push(newCatgory);
                setStateArray(StateArray=>[...StateArray, newCatgory]);
                //get all exercises sorted on x list
                let xname = ExData[i]['catgory'];
                let x = new Array();
                let z = 0;
                for(z=0;z < ExData.length;z++){
                    if(ExData[z]['catgory'] === xname){
                        x.push(ExData[z]['name']);
                    }
                }
                
                //then choose random one on x

                const theChoosenExersiceFromGatogryX = x[Math.floor(Math.random() * x.length)];
                ExerciseList.push([theChoosenExersiceFromGatogryX]);
                setStateArrayEx(StateArrayEx =>[...StateArrayEx,theChoosenExersiceFromGatogryX])
                //ExerciseList.push(theChoosenExersiceFromGatogryX);
                console.log(xname + " CHoosen is " + theChoosenExersiceFromGatogryX);
            }
        }

        
        return(
            {catgoryList,ExerciseList}
        );
    }
    
    function Show(){
        let list = new Array();
        for(let i = 0 ; i < StateArrayEx.length; i++){
            list.push(<div id={i.toString()} key={i}><h1>tag: {StateArray[i]}, exercise: {StateArrayEx[i]}</h1></div>);
        } 
        return list;
    }

    function AllTags(){
        let list = new Array();

        for(let i = 0 ; i < StateArray.length; i++){
            list.push(<div id={i.toString()} key={i}><h5>tag: {StateArray[i]}</h5></div>);
        } 
        return list;
    }
    function AllExercises(){
        let list = new Array();
        for(let i = 0 ; i < ExData.length; i++){
            list.push(<div id={i.toString()} key={i}><h5>exercise: {ExData[i]['name']}</h5></div>);
        } 
        return list;
    }

    return (
        
        <div className="💪flex 💪C">
            {
                LoadedUser? (
                <div className="createEx">
                    <input type="text" onChange={(e)=>{setexName(e.target.value)}} value={exName} placeholder="exercise Name"/>
                    <input type="text" onChange={(e)=>setexCatgory(e.target.value)} value={exCatgory} placeholder="exercise Tag"/>
                    <input className="✅submit" type="submit" onClick={Addnewex}/>
                </div>
                
                ):null
            }
            <div className="💪flex 💪C">
                <button className="✅submit" onClick={GenerateRandomExerciseSession}>Make Random Exercise session</button>
                <Show/>
                <div> 
                    <h1>All tags:</h1>
                    <AllTags/>
                </div>
                <div> 
                    <h1>All exercises:</h1>
                    <AllExercises/>
                </div>
            </div>
            
        </div>
    )
}

export default Exercise