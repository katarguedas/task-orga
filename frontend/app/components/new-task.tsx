import { CiSquarePlus, CiTrash } from "react-icons/ci";
import { v4 as uuidv4 } from 'uuid';
import { useDataContext } from "app/providers/dataContext";
import type { Task, TopicGroup } from "app/types/TopicTypes";
import { useState } from "react";
import InputForm from 'app/UI/input-form';
import { useDragAndDropContext } from "app/providers/dragAndDropContext";

type Props = {
  topicId: string;
  tasksLength: number;
}

export default function NewTask(props: Props) {

  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);

  const { data, saveData, setData } = useDataContext();
  const { handleDragEnter, handleDragLeave, handleDragOver, handleDragEnd,handleDrop } = useDragAndDropContext();


  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(prevState =>
      event.target.value,
    );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTask: Task = {
      id: uuidv4(),
      name: inputValue,
      status: 'todo',
      progress: 0,
    };

    const updateTopics = () => {
      const newTopics: TopicGroup[] = data!.map((topic) => {
        return topic.id !== props.topicId ? topic : { ...topic, tasks: [...topic.tasks, newTask] }
      })
      return newTopics;
    }
    const newData = updateTopics();
    saveData(newData);
    setData(newData);
    setShowInput(false);
    setInputValue("");
  }

  return (
    <>
      <div className="bg-neutral-100 ">
        <CiSquarePlus
          className=" hover:text-blue-700 hover:cursor-pointer h-full w-9 p-1 justify-self-center text-blue-400"
          onClick={() => setShowInput(!showInput)}
        />
      </div>
      <div className="bg-neutral-100 " >
        {showInput &&
          <InputForm
            inputValue={inputValue}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        }
      </div>
      <div
        id="trash"
        className="bg-neutral-100 "
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDrop={(event) => handleDrop(event, props.topicId)}
      >
        {
          props.tasksLength > 0 &&
          <CiTrash
            className=" hover:text-blue-700  h-full w-9 p-1 justify-self-center text-blue-400"
          />
        }

      </div>
    </>
  )
}