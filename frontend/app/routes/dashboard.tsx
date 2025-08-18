
import TaskTable from "app/components/task-table";
import useAuth from "app/hooks/useAuth";
import { DataContextProvider } from "app/providers/dataContext";
import type { TopicGroup } from "app/types/TopicTypes";
import { use, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


// "todo | inProgress | done"





export default function Dashboard() {

  const navigate = useNavigate();
  const { isLoggedIn, userId } = useAuth();


  useEffect(() => {
    console.log("isLoggedIn: ",isLoggedIn)
    if (!isLoggedIn) {
      navigate("sign-in")
    }

  }, [])




  return (<>
    <DataContextProvider>
      <h1 className="text-center capitalize m-6 mb-12">Dashboard</h1>
      <div className="mb-15">

        <TaskTable />

      </div>
    </DataContextProvider>




  </>)
}