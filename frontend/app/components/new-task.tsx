import { v4 as uuidv4 } from 'uuid';
import { useDataContext } from "app/providers/dataContext";
import type { Task, TopicGroup } from "app/types/TopicTypes";
import { useState } from "react";
import InputForm from 'app/UI/input-form';

type Props = {
  topicId: string;
  showInput: boolean;
  setShowInput: React.Dispatch<boolean>;
}

export default function NewTask(props: Props) {

  const [inputValue, setInputValue] = useState("");

  const { data, saveData, setData } = useDataContext();


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
    props.setShowInput(false);
    setInputValue("");
  }

  return (
    <>
      <div className="bg-neutral-100 " >
        {props.showInput &&
          <InputForm
          inputValue={inputValue}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          />
        }
      </div>
      <div className="bg-neutral-100 " ></div>
    </>
  )
}