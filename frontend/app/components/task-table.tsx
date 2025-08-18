import type { TopicGroup } from "app/types/TopicTypes";
import Topic from "./topic";
import { useEffect } from "react";
import useData from "app/hooks/useData";



export default function TaskTable() {

  const {data} = useData();


  return (

    <div
      id="todo"
      className="w-11/12 grid grid-cols-[1fr_4fr_1fr]  grid-flow-dense gap-1 text-center shadow-lg m-5"
    >
      <div
        id="todo"
        className="bg-red-400 w-full text-lg text-center py-2.5 justify-self-center row-start-1 row-end-1 font-semibold"
      >
        To Do
      </div>
      <div
        id="in-progress"
        className="bg-yellow-300 w-full text-lg text-center py-2.5 row-start-1 row-end-1 justify-self-center  font-semibold"
      >
        In Progress
      </div>
      <div
        id="done"
        className="bg-green-300 w-full text-lg text-center py-2.5 row-start-1 row-end-1 justify-self-center font-semibold "
      >
        Done
      </div>

      {data && data.length > 0 &&
        data.map((t: TopicGroup) => (
          <Topic
            key={t.id}
            topicId={t.id}
            name={t.name}
          />
        ))
      }
    </div>

  )
}