import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function MyBook() {
  const navigate = useNavigate();
  function Logout(){
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/home");
    
    
  }
  return (
    <div>
        <Link className='💪Flex 💻link' to={"/timeblock"}>⌚<h3 className='🧊GradientText'>Time Blocks</h3></Link>
        <Link className='💪Flex 💻link' to={"/exercise"}>🥋<h3 className='🧊GradientText'>Exercise</h3></Link>
        <button onClick={Logout}><h3 className='🧊GradientText'>Logout</h3></button>
    </div>
  )
}

export default MyBook