
import useAuth from "app/hooks/useAuth";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const  {isLoggedIn} = useAuth();

    useEffect(() => {
      console.log(isLoggedIn)
      if (!isLoggedIn){
      navigate("sign-in")
    }
  }, [])

  return (<>
      Dashboard
      <div>
      </div>



  </>)
}