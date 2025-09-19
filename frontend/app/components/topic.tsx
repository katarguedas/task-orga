import { CiSquarePlus, CiTrash } from "react-icons/ci";

import { useDataContext } from "app/providers/dataContext"
import type { Task } from "app/types/TopicTypes"
import {
  useEffect, useState
} from "react"
import NewTask from "./new-task";
import { useDragAndDropContext } from "app/providers/dragAndDropContext";
import EmptyCell from "./empty-cell";

type Props = {
  topicId: string,
  name: string,
}

const progressSteps = [0.1, 0.3, 0.5, 0.7, 0.9]


export default function Topic({ topicId, name }: Props) {

  const [rowGridClass, setRowGridClass] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showInput, setShowInput] = useState(false);

  const { data, setData, getData } = useDataContext();

  const { isDragOver, item, setItem, handleDragStart, handleDragEnter, handleDragLeave, handleDragEnd, handleDragOver, handleDrop } = useDragAndDropContext();



  useEffect(() => {
    if (!data) {
      const data = getData();
      setData(data);
    } else {
      const topicIndex = data.findIndex(topic => topic.id === topicId);
      const nTask = data[topicIndex].tasks.length;
      setTasks(data[topicIndex].tasks);
      const classString = "grid grid-rows-" + nTask.toString() + 1 + " auto-rows-fr whitespace-nowrap subgrid h-full "
      setRowGridClass(classString);
    }
  }, [data])



  useEffect(() => {
    if (!isDragOver) {
      setItem("");
    }
  }, [isDragOver])



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
                      className=" bg-purple-100 border border-purple-400 rounded-lg mx-1 my-0.5 px-1 py-0.5 w-fit h-fit self-center hover:cursor-pointer"
                      draggable
                      onDragStart={(event) => handleDragStart(event, index)}
                    >{task.name}</div> :
                    <EmptyCell
                      key={task.id}
                      taskId={task.id}
                      id={(index+1).toString()}
                      topicId={topicId}
                      colProp="todo"
                      value="0 %"
                    />
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
                          <EmptyCell
                            key={innerIndex}
                            taskId={task.id}
                            id={(outerIndex + 1) + "-c" + (innerIndex + 1)}
                            topicId={topicId}
                            colProp="inProgress"
                            value={progress + " %"}
                          />
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
                    <EmptyCell
                      key={task.id}
                      taskId={task.id}
                      id={(index+1).toString()}
                      topicId={topicId}
                      colProp="done"
                      value="1 %"
                    />
                ))
              }
            </div>
          </div>
          {/* last row of the topic to add or to delete a task: */}
          <div className="bg-neutral-100 ">
            <CiSquarePlus
              className=" hover:text-blue-700 hover:cursor-pointer h-full w-9 p-1 justify-self-center text-blue-400"
              onClick={() => setShowInput(!showInput)}
            />
          </div>

          <NewTask
            topicId={topicId}
            showInput={showInput}
            setShowInput={setShowInput}
          />
          <div
            id="trash"
            className="bg-neutral-100 "
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            onDrop={(event) => handleDrop(event, topicId)}
          >
            {
              tasks.length > 0 &&
              <CiTrash
                className=" hover:text-blue-700  h-full w-9 p-1 justify-self-center text-blue-400"
              />
            }

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