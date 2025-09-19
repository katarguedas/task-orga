import useDragAndDrop from "app/hooks/useDragAndDrop";
import { createContext, useContext } from "react";



interface DragAndDropContextInterface {
  isDragOver: boolean;
  setIsDragOver: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRow: string;
  setSelectedRow: React.Dispatch<React.SetStateAction<string>>;
  item: string;
  setItem: React.Dispatch<React.SetStateAction<string>>;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>, index: number) => void;
  handleDragEnter: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragEnd: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>, topicId: string) => void;
  // handleDrop: (event: React.DragEvent<HTMLDivElement>, topicId: string)=>void;
};


const initDragAndDropContext = {
  isDragOver: false,
  setIsDragOver: () => { },
  selectedRow: "",
  setSelectedRow: () => { },
  item: "",
  setItem: () => { },
  handleDragStart: (event: React.DragEvent<HTMLDivElement>, index: number) => { },
  handleDragEnter: (event: React.DragEvent<HTMLDivElement>) => { },
  handleDragLeave: (event: React.DragEvent<HTMLDivElement>) => { },
  handleDragEnd: (event: React.DragEvent<HTMLDivElement>) => { },
  handleDragOver: (event: React.DragEvent<HTMLDivElement>) => { },
  handleDrop: (event: React.DragEvent<HTMLDivElement>, topicId: string) => { },
};


const DragAndDropContext = createContext<DragAndDropContextInterface>(initDragAndDropContext);

const useDragAndDropContext = () => useContext(DragAndDropContext);


const DragAndDropContextProvider = ({ children }: { children: React.ReactNode }) => {

  const { isDragOver, setIsDragOver, selectedRow, setSelectedRow, item, setItem,
    handleDragStart, handleDragEnter, handleDragLeave, handleDragEnd, handleDragOver, handleDrop } = useDragAndDrop();

  return (
    <DragAndDropContext.Provider value={{
      isDragOver, setIsDragOver, selectedRow, setSelectedRow, item, setItem,
      handleDragStart, handleDragEnter, handleDragLeave, handleDragEnd, handleDragOver, handleDrop
    }} >
      {children}
    </DragAndDropContext.Provider>
  )
}


export { useDragAndDropContext, DragAndDropContextProvider };