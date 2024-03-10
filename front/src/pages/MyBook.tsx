import { Link } from 'react-router-dom';

function MyBook() {
  return (
    <div>
        <Link className='💪Flex 💻link' to={"/timeblock"}>⌚<h3 className='🧊GradientText'>Time Blocks</h3></Link>
        <Link className='💪Flex 💻link' to={"/exercise"}>🥋<h3 className='🧊GradientText'>Exercise</h3></Link>
        <button><h3 className='🧊GradientText'>Logout</h3></button>
    </div>
  )
}

export default MyBook