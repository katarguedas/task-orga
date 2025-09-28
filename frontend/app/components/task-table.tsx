import type { TopicGroup } from "app/types/TopicTypes";
import Topic from "./topic";
import { useEffect, useState } from "react";
import useData from "app/hooks/useData";
import NewTopic from "./new-topic";
import { useDataContext } from "app/providers/dataContext";
import TableHeader from "./table-header";
import { DragAndDropContextProvider } from "app/providers/dragAndDropContext";



export default function TaskTable() {


  const { data } = useDataContext();



  return (
    <DragAndDropContextProvider>
      <div
        id="table"
        className="w-11/12 grid grid-cols-[1fr_4fr_1fr] grid-flow-dense m-6 gap-0 text-center border-neutral-500 rounded-xl shadow-xl shadow-neutral-500"
      >
        <TableHeader />

        {data && data.length > 0 &&
          data.map((t: TopicGroup) => (
            <Topic
              key={t.id}
              topicId={t.id}
              name={t.name}
            />
          ))
        }
        <NewTopic />
      </div>
    </DragAndDropContextProvider>
  )
}