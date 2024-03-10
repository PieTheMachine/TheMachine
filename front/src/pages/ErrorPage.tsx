import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
        <h1>error page</h1>
        <p>return back to <Link to="/">Home</Link></p>
        
    </div>
  )
}

export default ErrorPage;