import useData from "app/hooks/useData";
import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { TopicGroup } from "app/types/TopicTypes";
import { initData } from "app/hooks/useData";

interface DataContextInterface {
  data: TopicGroup[] | undefined,
  setData: React.Dispatch<React.SetStateAction<TopicGroup[]>>,
  getDataFromBackend: Function,
  saveData: Function,
  getData: Function,

}


const initTopicGroup = initData;

const initDataContext = {
  data: initTopicGroup,
  setData: () => { } ,
  getDataFromBackend: () => { } ,
  saveData: (data: TopicGroup[]) => { },
  getData: () => { },

}


const DataContext = createContext<DataContextInterface>(initDataContext);

const useDataContext=()=>useContext(DataContext);


const DataContextProvider = ({ children }: { children: React.ReactNode }) => {

  const { data, setData, getDataFromBackend, saveData, getData } = useData();

  return (
    <DataContext.Provider value={{ data, setData, getDataFromBackend, saveData, getData,  }} >
      {children}
    </DataContext.Provider>
  )
}


export { useDataContext, DataContextProvider };