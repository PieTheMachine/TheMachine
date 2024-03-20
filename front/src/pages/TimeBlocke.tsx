import { useState, useEffect, useRef } from "react";
import '../root.css'
import './TimeBlocke.css'
import x from '../assets/x_black.svg'

import axios from "axios";


function TimeBlocke() {

  const hours = 24;
  const howmuchisablock = 1.5;
  const blokes = hours / howmuchisablock;

  let id = "";

  const [show, setshow] = useState(false);
  const [blockesloaded, setblockesloaded] = useState(false);

  //Get items from db
  function ShowBlockDetails() {
    setshow(!show);
  }
  //create block
  const [index, setindex] = useState("");
  const [title, settitle] = useState("");
  const [text, settext] = useState("");
  const [level, setlevel] = useState("");

  //let DBBlock =[0];
  const [DBBlock, setDBBlock] = useState([]);

  async function CreateBlcok() {
    await GetuserData();
    const data = {
      index, title, text, level, id,
    }
    axios.post(import.meta.env.VITE_server + "/timeblock/create", data)
      .then(() => {

      })
  }
  //Get user's data
  //get data stuff

  useEffect(() => {
    GetuserData();
  }, [])

  async function GetuserData() {

    id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    GetBlockesOfUser();
    return;
  }

  async function GetBlockesOfUser() {
    const data = {
      id,
    }
    const server = import.meta.env.VITE_server + "/timeblock/myblocks";
    const result = await axios.post(server, data, { withCredentials: true });
    if (result.data['users_Blockes'].length > 0) {
      setDBBlock(result.data['users_Blockes']);

      setblockesloaded(true);
    } else {
      setblockesloaded(true);
    }
    console.log(result);
    LoadQuests();
  }


  //#region blocks and blocks
  function ReturnClassName(level: string) {

    return "🔰Grid-item 💪Flex 💪C level" + level;
  }
  //item = Blcok  
  function Items() {
    let list = [];
    let i = 0;
    for (i = 0; i < blokes; i++) {
      const data = IfExistThenGiveData(i);
      const level = data[2].toString();
      list.push(
        <div key={i} className={ReturnClassName(level)} id={i.toString()} onClick={ShowBlockDetails}>
          <h4>{GetmeNumber(i)}</h4>
          <h4>{data[0]}</h4>
          <h4>{data[1]}</h4>
          <h4>Level: {data[2]}</h4>

          <input className="📺full 🎩OnTopCover indexsaver" type="text" onFocus={(e) => (setindex(e.target.value), settitle(data[0].toString()), settext(data[1].toString()), setlevel(data[2].toString()))} value={i} />
        </div>
      );
    }

    return list;
  }

  //Get number
  function GetmeNumber(i = 0) {
    //first
    const first = i * howmuchisablock;
    const x = Math.floor(first);
    let xString = x.toString();
    if (first % 1 > 0) {
      xString += ":30";
    } else {
      xString += "h";
    }

    //second
    const second = (i + 1) * howmuchisablock;
    const y = Math.floor(second);
    let yString = y.toString();
    if (second % 1 > 0) {
      yString += ":30";
    } else {
      yString += "h";
    }

    const fromto = xString + " - " + yString;
    return fromto;
  }

  function IfExistThenGiveData(i = 0) {
    let y = 0;
    let title = "";
    let text = "";
    let level = 0;

    for (y = 0; y < DBBlock.length; y++) {
      if (DBBlock[y]['index'] === i) {
        title = DBBlock[y]['title'];
        text = DBBlock[y]['text'];
        level = DBBlock[y]['level'];

        break;
      }
      else {
        title = 'empty time';
        text = "";
        level = 0;
      }
    }

    return [title, text, level,];
  }
  //#endregion 
  //#region load Quests

  //Get all quests of user

  let allquests = new Array();
  const [AllQuests, setAllQuests] = useState(new Array());
  const [loadedquest, setloadedquest] = useState(false);

  function LoadQuests() {
    console.log("Loading quests");

    const server = import.meta.env.VITE_server + "/quest/getusersquests";
    id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const data = {
      id,
    }
    axios.post(server, data).then((res) => {
      allquests = res.data["allquests"];
      setAllQuests(allquests)

      if (allquests.length > 0) {
        setloadedquest(true);
      }
    })
  }
  const [showQuests, setshowQuests] = useState(false)
  function ShowMeAllQuests() {
    let list = new Array();
    for (let i = 0; i < AllQuests.length; i++) {
      const delayy = 250 * i;
      list.push(
        <div className="💪Flex 💪C QuestToAdd" style={{ animationDelay: delayy + "ms" }}>
          <span key={i}>{AllQuests[i]["questname"]}</span>
          <button onClick={() => AddQuestToThisBlcok(i, index)} className="✅submit"><span>Add to block</span></button>
        </div >
      )
    }
    return list;
  }
  function AddQuestToThisBlcok(indexOfQuest: number, indextOfBlock: string) {
    console.log(indextOfBlock);
    console.log(indexOfQuest);

    const server = import.meta.env.VITE_server + "/quest/addquesttoblock";
    const Id = document.cookie.replace(/(?:(?:^|.*;\s*)user_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const QuestName = AllQuests[indexOfQuest]["questname"];
    const NewIndexOfBlcok = indextOfBlock;
    const data = {
      Id, QuestName, NewIndexOfBlcok
    }
    axios.post(server, data).then((res) => {
      console.log(res);
    })
  }
  // render the quest
  function ListOfAllQuestsForThisBlcok() {
    let list = new Array()
    //LoadQuests();
    console.log(AllQuests);
    console.log("list");
    for (let i = 0; i < AllQuests.length; i++) {
      let isInBlcok = false;
      for (let x = 0; x < AllQuests[i]["timeblockindexs"].length; x++) {
        if (AllQuests[i]["timeblockindexs"][x] == index) {
          isInBlcok = true;
          break;
        }
      }
      if (isInBlcok) {
        list.push(
          <div key={i} className="🃏Card">
            <span>{AllQuests[i]["questname"]}</span>
          </div>
        )
      }
    }
    console.log(AllQuests.length)
    return list;
  }

  function UpdateUIIfHaveLoadedPefore() {
    if (AllQuests.length > 0) {
      console.log("update")
      setloadedquest(true);
    }

    return null;
  }

  //#endregion
  return (
    <div>
      <h1>Time Blokes</h1>
      <div className="🧮Grid">
        {
          blockesloaded ? Items() : null
        }
        {
          show ?
            <div id="📄details" className="📄details">
              <div className="pos_reltive 📺full">

                <button className="❌bn" onClick={ShowBlockDetails}><img className="❤redimg" src={x} alt="" /></button>

                <div className=" ℹInfoHolder">
                  <input className="📱TextInput" type="text" placeholder="title" value={title} onChange={(e) => settitle(e.target.value)} />
                  <input className="📱TextInput" type="text" placeholder="text" value={text} onChange={(e) => settext(e.target.value)} />
                  <input className="📱TextInput" type="number" placeholder="level" max={5} value={level} onChange={(e) => setlevel(e.target.value)} />
                  <button className="✅submit" type="submit" onClick={CreateBlcok}><span>Update</span></button>
                </div>

                <div className="➕AddQuestDiv">
                  <input onClick={() => setshowQuests(!showQuests)} type="submit" value={""} />
                </div>

                {
                  showQuests ? (
                    ShowMeAllQuests()
                  ) : null
                }

                <div className="⁉QuestsHolder 💪Flex 💪C">
                  {
                    loadedquest ? (
                      ListOfAllQuestsForThisBlcok()
                    ) : (
                      UpdateUIIfHaveLoadedPefore()
                    )
                  }

                </div>
              </div>
            </div>
            : null
        }

      </div>

    </div>
  )
}

export default TimeBlocke;