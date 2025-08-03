import useAuth from "app/hooks/useAuth";
import { Link } from "react-router-dom";

export default function Demo() {

  const  {isLoggedIn} = useAuth();

  return (
    <>
      {isLoggedIn ?
        <div className="flex justify-end wrap" >
        <Link to="/sign-in" className="m-3">logout</Link>
      </div>
        :
      <div className="flex justify-end wrap" >
        <Link to="/sign-in" className="m-3">login</Link>
        <Link to="/sign-up" className="m-3">Registrieren</Link>
      </div>}
      <h1 className="flex justify-center m-5" >DEMO - VERSION</h1>
      <div>...</div>
    </>
  )
}