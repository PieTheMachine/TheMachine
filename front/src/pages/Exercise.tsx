import axios from "axios"
import { useState, useEffect } from "react";
import '../root.css';
import './exercise.css';

function Exercise() {
    //important


    let varid = '';
    const [Userid, setUserid] = useState("");
    //get user
    useEffect(() => {
        GetuserData();
    }, [])

    async function GetuserData() {
        varid = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        setUserid(varid);
        return;
    }
    //add exercise + save it with user id
    const server = import.meta.env.VITE_server;

    const [exName, setexName] = useState('');
    const [exCatgory, setexCatgory] = useState('');
    function Addnewex() {
        const id = Userid;

        const data = {
            exName, exCatgory, id,
        }
        axios.post(server + "/exercises/make", data)
            .then((res) => {
                console.log("created"); console.log(res);
                GetExercisesForThisUser();
            });
    }

    //get all exercises for this user
    //let ExData = new Array();
    const [ExData, setExData] = useState([])
    async function GetExercisesForThisUser() {
        console.log("1")
        const data = {
            Userid,
        }

        await axios.post(server + "/exercises/user", data)
            .then((res) => {
                setExData(res.data);
                return;
            })
    }




    //generate random exercises
    let catgoryList = new Array();

    const [StateArray, setStateArray] = useState([]);
    const [StateArrayEx, setStateArrayEx] = useState([]);

    async function GenerateRandomExerciseSession() {
        //clear list

        await GetExercisesForThisUser();
        console.log("2")
        //clearing data
        setStateArray([]);
        setStateArrayEx([]);

        if (ExData[0] !== "U") {
            //Get all exercises catgorys
            for (let i = 0; i < ExData.length; i++) {
                if (catgoryList.includes(ExData[i]['catgory'])) {

                } else {
                    const newCatgory = ExData[i]['catgory'];
                    catgoryList.push(newCatgory);
                    setStateArray(StateArray => [...StateArray, newCatgory]);
                    //get all exercises sorted on x list
                    let xname = ExData[i]['catgory'];
                    let x = new Array();
                    for (let z = 0; z < ExData.length; z++) {
                        if (ExData[z]['catgory'] === xname) {
                            x.push(ExData[z]['name']);
                        }
                    }

                    //then choose random one on x
                    const theChoosenExersiceFromGatogryX = x[Math.floor(Math.random() * x.length)];
                    setStateArrayEx(StateArrayEx => [...StateArrayEx, theChoosenExersiceFromGatogryX])

                }
            }

            return (
                null
            );
        }
    }

    function Show() {

        let list = new Array();
        for (let i = 0; i < StateArrayEx.length; i++) {
            const delayanimatino = 250 * i;
            list.push(
                <div className="🎽ExItem 💪Flex 💪C" key={i} style={{ animationDelay: delayanimatino + "ms" }}>
                    <span>🚩Tag: {StateArray[i]} </span>
                    <span>Exercise: {StateArrayEx[i]}</span>
                </div>
            );
        }
        return list;
    }
    function AllCats() {
        let list = new Array;
        for (let index = 0; index < StateArray.length; index++) {

            list.push(
                <option value={StateArray[index]}>{StateArray[index]}</option>
            )

        }
        return list;
    }
    return (

        <div className="💪Flex 💪C GapCool">
            <div className=" 💪Flex 💪C GapCool 🪓🍽LogMenu">
                <input className="📱TextInput" type="text" onChange={(e) => { setexName(e.target.value) }} value={exName} placeholder="exercise Name" />
                <select onChange={(e) => setexCatgory(e.target.value)}>
                    <option value="None">None</option>
                    {
                        AllCats()
                    }
                </select>
                <span>or create new tag</span>
                <input className="📱TextInput" type="text" onChange={(e) => setexCatgory(e.target.value)} value={exCatgory} placeholder="exercise Tag" />
                <button className="✅submit" onClick={Addnewex}><span>Create new exercise</span></button>
            </div>


            <div className="💪Flex 💪C 📃createEx" >
                <button className="✅submit" onClick={() => { GenerateRandomExerciseSession(); }}><span>Make Random <br /> Exercise session</span></button>
                {
                    ExData[0] != "U" ? (
                        <div className="🧰ExList">
                            {Show()}
                        </div>
                    ) : null
                }


            </div>

        </div>
    )
}

export default Exercise