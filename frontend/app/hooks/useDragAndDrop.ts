import { useDataContext } from "app/providers/dataContext";
import type { Task, TopicGroup } from "app/types/TopicTypes";
import { useState } from "react";



const useDragAndDrop = () => {


  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string>("");
  const [item, setItem] = useState("");

  const { data, setData, saveData } = useDataContext();



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
    // oder in Richtung Papierkorb
    const targetRow = event.currentTarget.id.split("-")[1];
    if (targetRow === selectedRow || event.currentTarget.id === "trash") {
      event.preventDefault();
    }
  };


  const handleDrop = (event: React.DragEvent<HTMLDivElement>, topicId:string) => {
    event.preventDefault();

    const id = event.currentTarget.id;

    const updateData = (getNewTasks: (topic: TopicGroup) => Task[]) => {
      const updateTopics = () => {
        const newTopics: TopicGroup[] = data!.map((topic) => {
          return topic.id !== topicId ? topic : { ...topic, tasks: getNewTasks(topic) }
        })
        return newTopics;
      };
      const newData = updateTopics();
      saveData(newData);
      setData(newData);
      setIsDragOver(false);
    };

    if (id === "trash") {
      // remove task
      const toDeleteTaskId = event.dataTransfer.getData("text");

      const getNewTasks = (topic: TopicGroup) => {
        return topic.tasks.filter(task => task.id !== toDeleteTaskId)
      };
      updateData(getNewTasks);
    } else {
      // change task
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

      const getNewTasks = (topic: TopicGroup) => {
        return topic.tasks.map(task => {
          return task.id !== taskId ? task : { ...task, status: targetStatus, progress: progress }
        })
      };
      updateData(getNewTasks);
    }
  };


  return {
    isDragOver, setIsDragOver, selectedRow, setSelectedRow, item, setItem,
    handleDragStart, handleDragEnter, handleDragLeave, handleDragEnd, handleDragOver, handleDrop,
  };

};

export default useDragAndDrop;