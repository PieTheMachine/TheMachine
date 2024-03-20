import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./MyBook.css"

function MyBook() {
  const navigate = useNavigate();
  function Logout() {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "gold=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "SciFi=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/");

  }

  //user stuff
  const [Gold, setGold] = useState(0);
  const [SciFi, setSciFi] = useState(0);
  useEffect(() => {
    GetUserData();
  }, [])
  function GetUserData() {
    const gold = document.cookie.replace(/(?:(?:^|.*;\s*)Gold\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    const scifi = document.cookie.replace(/(?:(?:^|.*;\s*)SciFi\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    setGold(Number(gold));
    setSciFi(Number(scifi));
  }
  return (
    <div className='💪Flex 💪C'>
      <div className='🎱MyPoints 💪Flex'>
        <h2>🧪{SciFi}</h2>
        <h2>💲{Gold}</h2>

      </div>
      <div className='📃LinksList'>


        <Link className='💪Flex 💻link' to={"/timeblock"}>⌚<h3 className='🧊GradientText'>Time Blocks</h3></Link>
        <Link className='💪Flex 💻link' to={"/exercise"}>🥋<h3 className='🧊GradientText'>Exercise</h3></Link>
        <Link className='💪Flex 💻link' to={"/allquests"}>👑<h3 className='🧊GradientText'>Quests</h3></Link>
        <Link className='💪Flex 💻link' to={"/xp"}>🍀<h3 className='🧊GradientText'>Levels</h3></Link>
        <button className='✅submit' onClick={Logout}><span className='🧊GradientText'>Logout</span></button>
        {/* <h4>Under development</h4>
        <Link className='💪Flex 💻link' to={"/exercise"}>🃏<h3 className='🧊GradientText'>Flash Cards</h3></Link> */}
      </div>
    </div>
  )
}

export default MyBook