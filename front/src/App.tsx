//pages
import All_users from "./pages/All_users";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ErrorPage from "./pages/ErrorPage";
import TimeBlocke from "./pages/TimeBlocke";
import MyBook from "./pages/MyBook";
import Exercise from "./pages/Exercise";
/*gears*/
import Navbar from "./gear/Navbar";
import Timer from "./gear/Timer";



import {RouterProvider,createBrowserRouter,Outlet} from 'react-router-dom';
/* vars */

const router = createBrowserRouter([
  //used outlet + called warpper to be calld every time and it children will change pased on path
  {
    path:"/", //
    element:<NavbarWarpper/>,//it is a function below
    children:[
      {
        path:"/home",
        element:<Home/>,
      },
      {
        path:"/login",
        element:<Login/>,
      },
      {
        path:"/signup",
        element:<Signup/>,
      },
      {
        path:"*",
        element:<ErrorPage/>
      },{
        path:"Allusers",
        element:<All_users/>
      },
      //my book stuff
      {
        path:'MyBook',
        element:<MyBook/>
      },{
        path:'timeblock',
        element:<TimeBlocke/>
      },{
        path:'exercise',
        element:<Exercise/>
      }
    ]
  }

]);


function NavbarWarpper(){
  
  return(
    <div>
      <Navbar/>
      <Timer/>
      <Outlet/>
    </div>
  )
};

function App(){
    return(
      <div>
        <RouterProvider router={router}/>
      </div>
    )
}
export default App;