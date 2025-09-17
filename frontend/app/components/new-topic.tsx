import { v4 as uuidv4 } from 'uuid';
import type { TopicGroup } from "app/types/TopicTypes";
import { useState } from "react";
import { useDataContext } from 'app/providers/dataContext';
import InputForm from 'app/UI/input-form';



export default function NewTopic() {


  const [inputValue, setInputValue] = useState("");
  const [showInput, setShowInput] = useState(false);

  const { data, saveData, setData, getData } = useDataContext();

  console.log("NEW TOPIC")

  const handleClick = () => {
    setShowInput(!showInput);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {

    setInputValue(prevState =>
      event.target.value,
    );
  };


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTopic: TopicGroup = {
      id: uuidv4(),
      name: inputValue,
      tasks: [],
      isCompleted: false,
    };
    console.log("newTopic: ", newTopic);
    if (!data) {
      const dat = getData();
      setData(dat);
      saveData([...dat, newTopic]);
    } else {
      saveData([...data, newTopic])
    }
    setData(prev => [...prev, newTopic]);
    setShowInput(false);
    setInputValue("");
  }

  return (
    <>
      <button
        className="p-1.5 m-1 border border-gray-500 rounded-lg bg-blue-200 hover:bg-blue-100 cursor-pointer"
        type="button"
        onClick={handleClick}
      >
        neue Gruppe
      </button>
      {showInput &&
        <InputForm
          inputValue={inputValue}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
        />
      }
    </>
  )
}