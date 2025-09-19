import { useDragAndDropContext } from "app/providers/dragAndDropContext";


type Props = {
  taskId: string,
  id:  string,
  topicId: string,
  colProp: string,
  value: string,
}

export default function EmptyCell(props: Props) {

  const { item, handleDragEnter, handleDragLeave, handleDragOver, handleDragEnd, handleDrop } = useDragAndDropContext();

  return (
    <div
      key={props.taskId}
      id={props.colProp + "-r" + `${props.id}`}
      className={(item === props.colProp + "-r" + `${props.id}`) ?
        `${setColor(props.colProp)}` + "bg-green-200 opacity-30" : "opacity-1"}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDrop={(event) => handleDrop(event, props.topicId)}
    >
      {props.value}
    </div>
  )
}


const setColor = (colProp: string) => {
  let color: string;
  switch (colProp) {
    case "todo": color = "red-200"; break;
    case "inProgress": color = "yellow-300"; break;
    case "done": color = "green-200"; break;
    default: color = ""; break;
  }
};