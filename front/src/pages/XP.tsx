import axios from "axios";
import { useState, useEffect } from "react";

import "./Xp.css"
import "../root.css"
import { useNavigate } from "react-router-dom";

function XP() {
    //#region Starting
    const [userid, setuserid] = useState("");
    const [Updater, setUpdater] = useState(0);

    let id = "";
    useEffect(() => {
        GetUserData();
    }, [])
    function GetUserData() {
        id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        setuserid(id);
        //not untile we create it
        CheckIfLogedIn(id);
        GetAllXps();
    }

    const navegator = useNavigate();
    function CheckIfLogedIn(Id: string) {
        console.log(Id)
        if (Id === "") {
            navegator("/");
        } else {
            console.log("loged")
        }
    }
    function GetAllXps() {
        const server = import.meta.env.VITE_server + "/xp/getall";
        if (id === "") {
            id = userid;
        }
        const data = {
            xp_user_id: id
        }
        axios.post(server, data)
            .then((res) => {
                setLoadedXp(true);
                setAllXps(res.data);
            })
    }
    //#endregion Starting
    //#region Looks
    const [AllXps, setAllXps] = useState([]);
    const [LoadedXp, setLoadedXp] = useState(false);
    function ShowAllLevels() {
        let list = new Array();
        for (let i = 0; i < AllXps.length; i++) {
            const width = Math.floor((Number(AllXps[i]["xp_now_amount"]) / Number(AllXps[i]["xp_now_max_amount"])) * 100);


            const max = 200;//not 255 to get darker colors
            const min = 0;
            const R = Math.floor(Math.random() * (max - min + 1)) + min;
            const G = Math.floor(Math.random() * (max - min + 1)) + min;
            const B = Math.floor(Math.random() * (max - min + 1)) + min;
            const color1 = "rgb(" + R + "," + G + "," + B + ",0.5)";
            const color2 = "rgba(" + R + "," + G + "," + B + ",1)";

            list.push(
                <div className="🍁Level " key={i} onClick={() => { LoadMeOnForm(i); setShowCreatingUI(true) }} style={{ background: color1 }}>
                    <div className="☣Title" style={{ background: color1 }}>{AllXps[i]["xp_name"]}</div>
                    <span>Level:{AllXps[i]["xp_level"]}</span>
                    <br />
                    <div className="💪Flex 💪C">
                        <div className="🍚ProgressHolder 💪Flex">
                            <div className="🎮TheProgress" style={{ width: width.toString() + "%", background: color2 }}></div>
                            <span className="z1">{AllXps[i]["xp_now_amount"]}xp</span>
                        </div>
                        <span className="z1">/{AllXps[i]["xp_now_max_amount"]}</span>
                    </div>

                </div>
            )

        }
        return list;
    }

    function LoadMeOnForm(index: number) {
        setxp_name(AllXps[index]["xp_name"]);
        setxp_level(AllXps[index]["xp_level"]);
        setxp_now_amount(AllXps[index]["xp_now_amount"]);
        setxp_now_max_amount(AllXps[index]["xp_now_max_amount"]);
        setxp_multiplier(AllXps[index]["xp_multiplier"]);

    }
    //#endregion Looks
    //#region CreateXP
    const [xp_name, setxp_name] = useState("");
    const [xp_level, setxp_level] = useState("");
    const [xp_now_amount, setxp_now_amount] = useState("");
    const [xp_now_max_amount, setxp_now_max_amount] = useState("");
    const [xp_multiplier, setxp_multiplier] = useState("");

    //Update
    function CreateXpLevel() {
        const server = import.meta.env.VITE_server + "/xp/createneworupdate";

        // L = local
        const Lxp_name = xp_name;
        let Lxp_level = xp_level;
        let Lxp_now_amount = xp_now_amount;
        let Lxp_now_max_amount = xp_now_max_amount;
        console.log(Lxp_now_amount)
        console.log(Lxp_now_max_amount)
        const Lxp_multiplier = xp_multiplier;
        // Data
        const data = {
            xp_name: Lxp_name,
            xp_level: Lxp_level,
            xp_now_amount: Lxp_now_amount,
            xp_now_max_amount: Lxp_now_max_amount,
            xp_multiplier: Lxp_multiplier,
            xp_user_id: userid,
        }
        axios.post(server, data).then((res) => {
            GetAllXps();
            console.log(res);
        })

    }



    //Hide Show Create
    const [ShowCreatingUI, setShowCreatingUI] = useState(false)
    function CreatingUI() {
        return (
            <div className="🪓🍽LogMenu 💪Flex 💪C">
                <h3>Create new level</h3>
                <input className="📱TextInput" type="text" placeholder="Name" onChange={(e) => { setxp_name(e.target.value) }} value={xp_name} />
                <input className="📱TextInput" type="text" placeholder="Max" onChange={(e) => { setxp_now_max_amount(e.target.value) }} value={xp_now_max_amount} />
                <input className="📱TextInput" type="text" placeholder="Multiplier" onChange={(e) => { setxp_multiplier(e.target.value) }} value={xp_multiplier} />
                {
                    xp_now_amount.length > 0 ? (<input className="📱TextInput" type="text" placeholder="Now Level" onChange={(e) => { setxp_level(e.target.value) }} value={xp_level} />) : null
                }
                {
                    xp_now_amount.length > 0 ? (<input className="📱TextInput" type="text" placeholder="Now Xp" onChange={(e) => { setxp_now_amount(e.target.value) }} value={xp_now_amount} />) : null
                }

                <button className="✅submit" onClick={() => { CreateXpLevel(); setUpdater(Updater + 1); }} ><span>submit</span></button>
            </div>
        )
    }
    //#endregion
    return (
        <div className="💪Flex 💪C">

            <button className="✅submit" onClick={() => { setShowCreatingUI(!ShowCreatingUI) }}><span>Create / Edit</span></button>
            {
                ShowCreatingUI ? (CreatingUI()) : null
            }

            <h2>levels</h2>
            <div className="🛹LevelsHolder">

                {
                    LoadedXp ? (ShowAllLevels()) : null
                }
            </div>

        </div >
    )
}

export default XP