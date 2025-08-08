
import TaskTable from "app/components/task-table";
import useAuth from "app/hooks/useAuth";
import type { TopicGroup } from "app/types/TopicTypes";
import { use, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


import { v4 as uuidv4 } from 'uuid';
// "todo | inProgress | done"


export const topics: TopicGroup[] = [
  {
    id: uuidv4(),
    name: 'Fotos',
    tasks: [
      {
        id: uuidv4(),
        name: 'Fotos kopieren',
        status: 'done',
        progress: 1,
      },
      {
        id: uuidv4(),
        name: 'Fotos sortieren',
        status: 'done',
        progress: 1,
      },
      {
        id: uuidv4(),
        name: 'Fotos sichern',
        status: 'todo',
        progress: 0,
      },
      {
        id: uuidv4(),
        name: 'Fotos auswählen',
        status: 'inProgress',
        progress: 0.1,
      },
    ],
    isCompleted: false,
  },
  {
    id: uuidv4(),
    name: 'Passworter',
    tasks: [],
    isCompleted: false,
  },
  {
    id: uuidv4(),
    name: 'Haushalt',
    tasks: [
      {
        id: uuidv4(),
        name: 'Fenster putzen',
        status: 'todo',
        progress: 0,
      },
    ],
    isCompleted: false,
  },
  {
    id: uuidv4(),
    name: 'task-orga App',
    tasks: [
      {
        id: uuidv4(),
        name: 'Struktur',
        status: 'inProgress',
        progress: 1,
      },
      {
        id: uuidv4(),
        name: 'Aufgabentabelle',
        status: 'inProgress',
        progress: 0.25,
      },
      {
        id: uuidv4(),
        name: 'backend',
        status: 'todo',
        progress: 0,
      },
    ],
    isCompleted: false,
  },
];


export default function Dashboard() {

  const navigate = useNavigate();
  const { isLoggedIn, userId } = useAuth();
  const [data, setData] = useState<TopicGroup[]>()


  useEffect(() => {
    console.log(isLoggedIn)
    if (!isLoggedIn) {
      navigate("sign-in")
    }
    else {
      setData(topics)
    }
  }, [])

  useEffect(() => {
    if (data) {
      console.log("DATA: ", data)
    }
  }, [data])

  return (<>
    <h1 className="text-2x l text-center m-4 mb-7">Dashboard</h1>
    <div>
      {data &&
        <TaskTable data={data} />
      }

    </div>



  </>)
}