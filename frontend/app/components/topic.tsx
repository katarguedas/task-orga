import type { Task } from "app/types/TopicTypes"
import { useEffect, useState } from "react"

type Props = {
  name: string,
  tasks: Task[],
}

const filterTasks = (tasks: Task[]) => {
  return tasks.filter((task) => { return task.status === "inProgress" })
}

export default function Topic({ name, tasks }: Props) {

  const progressSteps = [0.1, 0.25, 0.5, 0.75, 1]
  const [rowGridClass, setRowGridClass] = useState("");

  useEffect(() => {
    const nTask = tasks.length;
    console.log(nTask)
    const classString = "grid grid-rows-" + nTask.toString() + " auto-rows-fr whitespace-nowrap subgrid h-full"
    console.log("classString: ",classString)
    setRowGridClass(classString)
  }, [])





  return (
    <>
      <div className="bg-purple-100 col-span-full py-1 h-fit border-t border-purple-400 ">{name}</div>

      {/* für jede Aufgabe ein neuer Schleifendurchlauf */}
      {
        <>
          <div className="bg-red-100 py-1 ">
            <div className={rowGridClass}>
              {
                tasks.map((task) => (
                  task.status === "todo" ?
                    <div key={task.id} className=" bg-purple-100 border border-purple-400 rounded-lg mx-1 my-0.5 px-1 py-0.5 w-fit h-fit">{task.name}</div> : <div key={task.id}></div>
                ))
              }
            </div>
          </div>

          <div className="bg-yellow-100 py-1 ">
            <div className={rowGridClass}>

              {
                tasks.map(task => (
                  <div className=" grid grid-cols-5 subgrid ">
                    {
                      progressSteps.map((progress, index) => (
                        task.progress === progress && task.status === "inProgress" ? setTask(task) : <div key={index} className="opacity-10 ">{index + 1}</div>
                      ))
                    }
                  </div>
                ))
              }
            </div>
          </div>

          <div className="bg-green-100 py-1 ">
            <div className={rowGridClass}>
              {
                tasks.map((task) => (
                  task.status === "done" ?
                    <div key={task.id} className="bg-purple-100 border border-purple-400 rounded-lg mx-1 my-0.5 px-1 py-0.5 w-fit h-fit ">{task.name}</div> : <div key={task.id}></div>
                ))
              }
            </div>
          </div>
        </>
      }

    </>
  )
}




function setTask(task: Task) {
  return <div key={task.id} className="justify-self-center bg-purple-100 border border-purple-400 rounded-lg mx-1 my-0.5 px-1 py-0.5 w-fit max-w-full h-fit z-3  ">{task.name}</div>
}