import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

import "../root.css";
import "./quests.css";


function Quests() {
    //#region Starting
    const [userid, setuserid] = useState("");
    const [TodaysDate, setTodaysDate] = useState(0);
    const [Allquests, setAllquests] = useState(new Array());
    let id = "";
    const [LoadedData, setLoadedData] = useState(false);
    useEffect(() => {
        GetUserData();
    }, [])
    function GetUserData() {
        id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        const today = new Date();
        const date = today.getDate();
        setTodaysDate(date);
        //setusername(name);
        setuserid(id);
        GetAllQuests();
    }
    function UpdatePage() {
        setUpdateUi(UpdateUi + 1);
        console.log(UpdateUi);
    }
    function GetAllQuests() {

        const server = import.meta.env.VITE_server + "/quest/getusersquests";
        if (id === "") {
            id = userid;
        }
        const data = {
            id: id
        }
        axios.post(server, data)
            .then((res) => {
                setAllquests(res.data["allquests"]);
                setLoadedData(true);
                GetAllLevels();
                UpdatePage();
            })
    }
    //Levels
    const [Levels, setLevels] = useState([]);
    function GetAllLevels() {
        const server = import.meta.env.VITE_server + "/xp/getall";
        if (id === "") {
            id = userid;
        }
        const data = {
            xp_user_id: id
        }
        axios.post(server, data)
            .then((res) => {
                setLevels(res.data);
                setLoadedData(true);
            })
    }
    function ListOfLevels() {
        let list = new Array();
        for (let i = 0; i < Levels.length; i++) {
            list.push(
                <option value={Levels[i]["xp_name"]}>{Levels[i]["xp_name"]}</option>
            )
        }
        return list;
    }
    function DeleteQuest(index: number) {
        console.log("Delete");
        const server = import.meta.env.VITE_server + "/quest/delete";

        const id = userid;
        const questName = Allquests[index]["questname"];
        const data = {
            id, questName
        }
        console.log(data)
        axios.post(server, data).then((res) => {
            console.log(res);
        })

        setSellectedQuest(false);
        GetAllQuests();
    }

    function LoadAllQuest() {
        let list = new Array();
        for (let i = 0; i < Allquests.length; i++) {
            let fin = false;
            let ClassName = "👑QuestPrif";
            if (Allquests[i]["finished"]) {
                fin = true
                ClassName = "👑QuestPrif 🤴FinishedQuest";
            }

            list.push(
                <div onClick={() => { TakeToQuest(i) }} className={ClassName}>
                    <div className="Name 💪Flex">
                        <span>{Allquests[i]["questname"]}</span>
                    </div>
                    <img className="🎮QuestIcon" src="QuestIcon.png" alt="Quest Icon" />
                    <div className="Progress 💪Flex ">
                        <div className="bar">
                            <div className="barProgress" style={{ width: Allquests[i]["questProgress"] + "%" }}></div>
                        </div>
                        <h3>{Allquests[i]["questProgress"]}%</h3>

                    </div>

                </div>
            )
        }
        return list;
    }

    //#endregion
    //#region Creating quests
    const [QuestName, setQuestName] = useState("");
    const [QuestGoal, setQuestGoal] = useState("");
    const [QuestProgress, setQuestProgress] = useState("");
    const [Description, setDescription] = useState("");
    const [Log, setLog] = useState("");
    const [QuestSubQuest, setQuestSubQuest] = useState("");
    const [QuestSubQuests, setQuestSubQuests] = useState(new Array());
    const [QuestReward, setQuestReward] = useState("");
    const [QuestDayley, setQuestDayley] = useState(false);

    const [QuestXpReward, setQuestXpReward] = useState("");
    const [QuestXpRewards, setQuestXpRewards] = useState(new Array());

    const [QuestXpRewardAmount, setQuestXpRewardAmount] = useState("");
    const [QuestXpRewardsAmount, setQuestXpRewardsAmount] = useState(new Array());//rewards s

    function CreateSubQuest() {
        if (QuestSubQuest.length > 0) {


            setQuestSubQuests(QuestSubQuests => [...QuestSubQuests, QuestSubQuest]);
            setQuestSubQuest("");
        }
        else {
            console.log("Short sup quest")
        }
    }
    function GetAllSubQuests() {
        let list = new Array();
        for (let i = 0; i < QuestSubQuests.length; i++) {
            list.push(
                <span key={i}>🎨{QuestSubQuests[i]}</span>
            )
        }
        return list;
    }
    function CreateNewXpReward() {
        if (QuestXpReward != "None") {
            setQuestXpRewards(QuestXpRewards => [...QuestXpRewards, QuestXpReward]);
            setQuestXpRewardsAmount(QuestXpRewardsAmount => [...QuestXpRewardsAmount, QuestXpRewardAmount]);
            setQuestXpReward("None");
        }
        else {
            console.log("NoteCHoosen")
        }
    }

    function GetAllXpRewards() {
        let list = new Array();
        for (let i = 0; i < QuestXpRewards.length; i++) {
            list.push(
                <span key={i}>{QuestXpRewards[i]} : {QuestXpRewardsAmount[i]}xp</span>
            )
        }
        return list;
    }
    function Clear() {
        setQuestName("");
        setQuestGoal("");
        setQuestProgress("");
        setDescription("");
        // sub quest
        setQuestSubQuest("");
        setQuestSubQuests(QuestSubQuests => []);
        // Levels
        setQuestXpReward("");
        setQuestXpRewards(QuestXpRewards => []);

        setQuestXpRewardAmount("");
        setQuestXpRewardsAmount(QuestXpRewardsAmount => []);
    }
    async function CreateNewQuest() {
        const server = import.meta.env.VITE_server + "/quest/newquest";


        //Check if filds are not empty
        if (QuestName === "" || QuestGoal === "" || QuestReward === "") {
            console.log("cancel")
            return;
        }
        //Merge reward and it xp
        let LevelsReward = new Array();
        LevelsReward.push(
            QuestXpRewards,
            QuestXpRewardsAmount,
        )
        const BlockDefult = "-1";
        const timeBlockDefult = {
            BlockDefult
        }
        const data = {
            QuestName: QuestName,
            QuestGoal: QuestGoal,
            QuestProgress: "0",
            QuestSubQuests: QuestSubQuests,
            QuestLevels: LevelsReward,
            Userid: userid,
            Timeblockindexs: timeBlockDefult,
            Description: Description,
            Log: " ",
            FinishedStatus: false,
            Reward: QuestReward,
            QuestDayley: QuestDayley,
            DayleyDate: TodaysDate,
        }
        console.log(data);


        //Create

        await axios.post(server, data)
            .then((res) => {
                console.log(res);
                setShowCreateQuestMenu(false);
            })

        GetAllQuests();

        setUpdateUi(UpdateUi + 1);

    }
    //#endregion
    //#region Quest Data
    const [SellectedQuest, setSellectedQuest] = useState(false);
    const [index, setSellectedQuestIndex] = useState(-1);

    const [LocalquestProgress, setLocalquestProgress] = useState("")
    const [LocalquestDescription, setLocalquestDescription] = useState("")
    const [LocalquestLog, setLocalquestLog] = useState("");
    const [LocalquestReward, setLocalquestReward] = useState("");
    const [LocalquestFinished, setLocalquestFinished] = useState(false);
    const [LocalquestRewardsXp, setLocalquestRewardsXp] = useState([]);
    const [LocalquestIndex, setLocalquestIndex] = useState(0)

    function TakeToQuest(indexOfQuest: number) {
        setLocalquestIndex(indexOfQuest);
        setLocalquestProgress(Allquests[indexOfQuest]["questProgress"])
        setLocalquestDescription(Allquests[indexOfQuest]["description"]);
        setLocalquestLog(Allquests[indexOfQuest]["log"]);
        setLocalquestReward(Allquests[indexOfQuest]["reward"]);
        setLocalquestFinished(Allquests[indexOfQuest]["finished"]);
        setLocalquestRewardsXp(Allquests[indexOfQuest]["questLevels"]);
        console.log(indexOfQuest);
        setSellectedQuestIndex(indexOfQuest);
        setSellectedQuest(true);
        return;
    }
    function HideQuestData() {
        setSellectedQuest(false);
    }

    let subquestslist = new Array();
    const [UpdateUi, setUpdateUi] = useState(0)
    function SelectedQuest() {

        let dayley = "false";
        if (Allquests[index]["dayley"]) {
            dayley = "true";

            console.log(TodaysDate);
            console.log(Allquests[index]["dayleyDate"]);
            if (Allquests[index]["dayleyDate"] === TodaysDate) {
                console.log("no need")
            } else {
                console.log("updatestate();")
                UpdateQuest();
            }
        }
        //Finish status
        let fin = "";
        if (Allquests[index]["finished"]) {
            fin = "True";
        } else {
            fin = "False";
        }
        //subquests
        let listOfSub = new Array();
        let HowMuchIsFinished = 0;

        for (let i = 0; i < Allquests[index]["questSubQuests"].length; i++) {
            const subquest = Allquests[index]["questSubQuests"][i];
            subquestslist.push(subquest);

            let subStatusNotInEmojes = false;
            if (Allquests[index]["questSubQuests"][i]["state"]) {

                subStatusNotInEmojes = true;
                HowMuchIsFinished++;
            } else {

                subStatusNotInEmojes = false;
            }
            listOfSub.push(
                <div key={i} className="🚉SubQuest" onClick={() => { subquestslist[i]["state"] = !subquestslist[i]["state"]; setUpdateUi(UpdateUi + 1) }}>
                    <input type="checkbox" onChange={() => { subquestslist[i]["state"] = !subquestslist[i]["state"]; setUpdateUi(UpdateUi + 1) }} checked={subStatusNotInEmojes} />
                    <span>🎉{Allquests[index]["questSubQuests"][i]["quest"]}</span>
                    {/* do same trick with the quest progress to get it to mach state */}
                </div>
            )
        }

        //Levels and xp
        let levels = [];
        for (let i = 0; i < Allquests[index]["questLevels"].length - 1; i++) {
            levels.push(
                <span>Level: {Allquests[index]["questLevels"][0][i]} Xp: {Allquests[index]["questLevels"][1][i]}</span>
            )
        }

        return (
            <div className="🧱QuestData 📺FullScreen 💪Flex 💪C">
                <div className="🧱QuestDataTheQuestSector 💪Flex 💪C">
                    <button className="❌Button" onClick={HideQuestData}><span>❌</span></button>

                    <span className="📛QuestName">{Allquests[index]["questname"]}</span>


                    <div className="🪓🍽LogMenu🍗Part">
                        <span>Goal: </span>
                        <span>{Allquests[index]["questGoal"]}</span>
                    </div>

                    {
                        Allquests[index]["dayley"] ? (<span>DayLey:{dayley}</span>) : null
                    }
                    {/* Sub quests */}
                    <div className="⚽📃SubQuestsList">
                        <span>Sub Quests:</span>
                        {
                            listOfSub
                        }
                        <div className="HowManyFinished">{HowMuchIsFinished} / {listOfSub.length}</div>
                    </div>
                    {/* Reward */}
                    <div className="🍮RewardSector 💪Flex 💪L">
                        <span>Reward: </span>
                        <input className="📱TextInput" type="text" onChange={(e) => setLocalquestReward(e.target.value)} value={LocalquestReward} placeholder="Reward" />
                        {
                            levels
                        }
                    </div>

                    {/* progress */}
                    <div className="🥇🥈ProgressHolder 💪Flex 💪C">
                        <div className="🥇BarProgress" style={{ width: LocalquestProgress + "%" }}></div>
                        <span className="z1 ">Progress</span>

                    </div>
                    <input className="z1 ProgressInput" type="number" max={100} min={0} onChange={(e) => { setLocalquestProgress(e.target.value); SetProgress(e.target.value) }} value={LocalquestProgress} />

                    {/* Hid finished and send it as true if progress is 100 */}


                    <div className="💪Flex 💪C 💪L">
                        {/* <span>Description:</span>
                        <input type="text" onChange={(e) => setLocalquestDescription(e.target.value)} value={LocalquestDescription} /> */}

                        <span>Log:</span>
                        <textarea className="💾Text" name="" onChange={(e) => setLocalquestLog(e.target.value)} value={LocalquestLog} cols={30} rows={10}></textarea>
                    </div>

                    <span>Finished:{fin}</span>

                    <div className="GapCool 💪Flex">
                        <button className="✅submit" onClick={() => DeleteQuest(index)}>Delete Quest</button>
                        <button className="✅submit" onClick={UpdateQuest} >Update</button>
                    </div>




                </div>

            </div>
        )
    }
    function SetProgress(progress: string) {
        console.log(Number(progress))
        if (Number(progress) > 100) {
            setLocalquestProgress("100");
        } else if (Number(progress) < 0) {
            setLocalquestProgress("0");
        }
        return;
    }
    //#endregion

    // Update Quest

    //const [SelectedFinished,setSelectedFinished] = useState(false);

    async function UpdateQuest() {
        let SelectedProgress = LocalquestProgress;
        const SelectedDescription = LocalquestDescription;
        const SelectedLog = LocalquestLog;
        const SelectedReward = LocalquestReward;
        let SelectedFinished = Allquests[LocalquestIndex]["finished"];
        console.log(SelectedFinished);



        if (!SelectedFinished) {
            console.log(LocalquestRewardsXp);
            if (Number(SelectedProgress) > 99) {
                //Add the rewards
                console.log("Reward");
                const ID = userid;
                const data = {
                    LocalquestRewardsXp, ID
                }
                const server = import.meta.env.VITE_server + "/xp/recivereward";
                await axios.post(server, data).then((res) => {
                    console.log(res);
                    console.log(res.data);
                })
                SelectedFinished = true;
            } else {
                SelectedFinished = false;

            }
        } else {
            //Update Date
            console.log("Finished")
            if (TodaysDate !== Allquests[LocalquestIndex]["dayleyDate"]) {
                console.log("Refrech state")
                SelectedFinished = false;
                SelectedProgress = "0";
            }
        }

        console.log("Update");

        const server = import.meta.env.VITE_server + "/quest/updatequest";
        const Name = Allquests[index]["questname"];
        const Goal = Allquests[index]["questGoal"];
        console.log(SelectedFinished);
        const data = {
            QuestName: Name,
            QuestGoal: Goal,
            QuestProgress: SelectedProgress,
            QuestSubQuests: subquestslist,
            Userid: userid,
            Timeblockindexs: "-1",
            Description: SelectedDescription,
            Log: SelectedLog,
            FinishedStatus: SelectedFinished,
            Reward: SelectedReward,
            DayleyDate: TodaysDate,
        }
        axios.post(server, data).then((res) => {
            console.log(res.data);
            GetAllQuests();
            setSellectedQuest(false);
        })
    }


    let day = "false";
    if (QuestDayley) {
        day = "true"
    }


    //HIde show liset 
    const [ShowCreateQuestMenu, setShowCreateQuestMenu] = useState(false)
    function CreateQuestMenu() {

        return (
            <div className="🪓🍽LogMenu GapCool 💪Flex 💪C ">
                <span>Create new Quest:</span>
                <input className="📱TextInput" type="text" onChange={(e) => setQuestName(e.target.value)} value={QuestName} placeholder="Quest Name" />
                <input className="📱TextInput" type="text" onChange={(e) => setQuestGoal(e.target.value)} value={QuestGoal} placeholder="Quest Goal" />
                {/* <input className="📱TextInput" type="text" onChange={(e) => setQuestProgress(e.target.value)} value={QuestProgress} placeholder="ProgressSoFar" /> */}
                <input className="📱TextInput" type="text" onChange={(e) => setDescription(e.target.value)} value={Description} placeholder="Description" />

                {/* Reward*/}
                <span>Set a Cool Reward</span>
                <input className="📱TextInput" type="text" onChange={(e) => setQuestReward(e.target.value)} value={QuestReward} placeholder="Reward" />

                <span>Optinal settings</span>
                <div className="🪓🍽LogMenu🍗Part 💪Flex 💪C">
                    <input className="📱TextInput " type="text" onChange={(e) => setQuestSubQuest(e.target.value)} value={QuestSubQuest} placeholder="Sub Quest" />
                    <div className="💪Flex 💪C 💪L">
                        {
                            QuestSubQuests.length > 0 ? (
                                <GetAllSubQuests />
                            ) : null

                        }
                    </div>

                    <button className="✅submit" onClick={CreateSubQuest} ><span>Create new sub quest</span></button>
                </div>

                {/* <input className="📱TextInput" type="text" onChange={(e) => setLog(e.target.value)} value={Log} placeholder="Log" /> */}


                <div className="DayleyCreateDiv">
                    <span>Daily ?</span>
                    <input type="checkbox" onChange={() => setQuestDayley(!QuestDayley)} checked={QuestDayley} />
                </div>



                {/* Levels and xp */}
                <span>Xp Rewards</span>
                <select onChange={(e) => { setQuestXpReward(e.target.value) }}>
                    <option value="None">none</option>
                    {
                        ListOfLevels()
                    }
                </select>

                <input className="📱TextInput" type="text" onChange={(e) => setQuestXpRewardAmount(e.target.value)} value={QuestXpRewardAmount} placeholder="Xp amount" />
                {
                    QuestXpRewardsAmount.length > 0 ? (
                        <GetAllXpRewards />
                    ) : null
                }


                <button className="✅submit" onClick={CreateNewXpReward} ><span>Add Xp Reward</span></button>
                <div className="💪Flex GapCool">
                    <button className="✅submit" onClick={Clear} ><span>Cancel</span></button>
                    <button className="✅submit" onClick={CreateNewQuest} ><span>Create</span></button>
                </div>




            </div>
        );
    }
    return (
        <div className="💪Flex 💪C">
            <button className="✅submit" onClick={() => { setShowCreateQuestMenu(!ShowCreateQuestMenu) }}><span>Create Quest</span></button>
            {
                ShowCreateQuestMenu ? (CreateQuestMenu()) : null
            }

            <div>


                {
                    SellectedQuest ? (
                        SelectedQuest()
                    ) : null
                }
                {
                    LoadedData ? (
                        <div className="📊Grid_of_all_quests 📺FullScreen">
                            <LoadAllQuest />
                        </div>
                    ) : (
                        null
                    )
                }
            </div>
        </div>
    )
}

export default Quests