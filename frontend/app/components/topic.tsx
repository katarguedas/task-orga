import useData from "app/hooks/useData"
import type { Task, TopicGroup } from "app/types/TopicTypes"
import {useEffect, useRef, useState
} from "react"

type Props = {
  topicId: string,
  name: string,
}



export default function Topic({ topicId, name }: Props) {

  const progressSteps = [0.1, 0.3, 0.5, 0.7, 0.9]
  const [rowGridClass, setRowGridClass] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string>();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [item, setItem] = useState("");
  const { data, setData, saveData } = useData();
  // const dragItem = useRef<string>("");


  useEffect(() => {
    const topicIndex = data.findIndex(topic => topic.id === topicId);
    const nTask = data[topicIndex].tasks.length;
    const classString = "grid grid-rows-" + nTask.toString() + " auto-rows-fr whitespace-nowrap subgrid h-full "
    setRowGridClass(classString)
  }, [])


  useEffect(() => {
    const topicIndex = data.findIndex(topic => topic.id === topicId);
    setTasks(data[topicIndex].tasks);
  }, [data])

  useEffect(() => {
    if (!isDragOver) {
      // dragItem.current = "";
      setItem("");
    }
  }, [isDragOver])




  const handleDragStart = (event: React.DragEvent<HTMLDivElement>, index: number) => {
    event.dataTransfer.setData("text", event.currentTarget.id)
    setSelectedRow("r" + `${index + 1}`);
  }

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    // dragItem.current = event.currentTarget.id;
    setItem(event.currentTarget.id);
    setIsDragOver(true);
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragOver(false);
  }

  const handleDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragOver(false);
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    // Verschieben des Elements soll nur innerhalb der selbsten Zeile möglich sein
    const targetRow = event.currentTarget.id.split("-")[1];
    if (targetRow === selectedRow) {
      event.preventDefault();
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const id = event.currentTarget.id;
    const targetStatus = id.split("-")[0];
    let targetColumn = undefined;
    let progress = undefined;
    if (id.split("-").length > 2) {
      targetColumn = id.split("-")[2];
      switch (targetColumn) {
        case "c1": progress = 0.1; break;
        case "c2": progress = 0.3; break;
        case "c3": progress = 0.5; break;
        case "c4": progress = 0.7; break;
        case "c5": progress = 0.9; break;
        default: progress = 0; break;
      }
    } else {
      progress = targetStatus === "done" ? 1 : 0;
    }

    const taskId = event.dataTransfer.getData("text");

    const newTasks = (topic: TopicGroup) => {
      return topic.tasks.map(task => {
        return task.id !== taskId ? task : { ...task, status: targetStatus, progress: progress }
      })
    }

    const updateTopics = (topics: TopicGroup[]) => {
      const newTopics: TopicGroup[] = topics.map((topic) => {
        return topic.id !== topicId ? topic : { ...topic, tasks: newTasks(topic) }
      })
      return newTopics;
    }
    const newData = updateTopics(data);

    saveData(newData);
    setData(newData);
    setIsDragOver(false);
  }



  return (
    <>
      <div className="bg-purple-100 col-span-full py-1 h-fit border-t border-purple-400 ">{name}</div>

      {
        <>
          <div className="bg-red-100 py-1 ">
            <div className={rowGridClass}>
              {
                tasks.map((task, index) => (
                  task.status === "todo" ?
                    <div
                      key={task.id}
                      id={task.id}
                      className=" bg-purple-100 border border-purple-400 rounded-lg mx-1 my-0.5 px-1 py-0.5 w-fit h-fit self-center "
                      draggable
                      onDragStart={(event) => handleDragStart(event, index)}
                    >{task.name}</div> :
                    <div
                      key={task.id}
                      id={"todo-r" + `${index + 1}`}
                      className={(item === "todo-r" + `${index + 1}`) ? "bg-red-200 opacity-30" : "opacity-1"}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDragEnd={handleDragEnd}
                      onDrop={handleDrop}
                    >
                      {"0 %"}
                      {/* {"todo-r" + `${index + 1}`} */}
                    </div>
                ))
              }
            </div>
          </div>

          <div className="bg-yellow-100 py-1 ">
            <div className={rowGridClass}>

              {
                tasks.map((task, outerIndex) => (
                  <div key={outerIndex} className=" grid grid-cols-5 subgrid ">
                    {
                      progressSteps.map((progress, innerIndex) => (
                        task.progress === progress &&
                          task.status === "inProgress" ? setTask(task, handleDragStart, outerIndex) :
                          <div
                            key={innerIndex}
                            id={"inProgress-r" + `${outerIndex + 1}` + "-c" + `${innerIndex + 1}`}
                            className={(item === "inProgress-r" + `${outerIndex + 1}` + "-c" + `${innerIndex + 1}`) ? "bg-yellow-300 self-stretch opacity-30" : "opacity-1 self-stretch "}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDragEnd={handleDragEnd}
                            onDrop={handleDrop}>
                            {progress + "%"}
                          </div>
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
                tasks.map((task, index) => (
                  task.status === "done" ?
                    <div
                      key={task.id}
                      id={task.id}
                      className="bg-purple-100 border border-purple-400 rounded-lg mx-1 my-0.5 px-1 py-0.5 w-fit h-fit self-center "
                      draggable
                      onDragStart={(event) => handleDragStart(event, index)}
                    >{task.name}</div> :
                    <div
                      key={task.id}
                      id={"done-r" + `${index + 1}`}
                      className={(item === "done-r" + `${index + 1}`) ? "bg-green-200 opacity-30" : "opacity-1"}
                      onDragEnter={handleDragEnter}
                      onDragLeave={handleDragLeave}
                      onDragOver={handleDragOver}
                      onDragEnd={handleDragEnd}
                      onDrop={handleDrop}
                    >{"1 %"}</div>
                ))
              }
            </div>
          </div>
        </>
      }

    </>
  )
}




function setTask(task: Task, handleDragStart: (event: React.DragEvent<HTMLDivElement>, index: number) => void, index: number) {
  return <div
    key={task.id}
    id={task.id}
    className="justify-self-center bg-purple-100 border border-purple-400 rounded-lg mx-1 my-0.5 px-1 py-0.5 w-fit max-w-full h-fit z-3 text-wrap self-center overflow-hidden"
    draggable
    onDragStart={(event) => handleDragStart(event, index)}

  >{task.name}</div>
}