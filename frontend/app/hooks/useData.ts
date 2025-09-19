import { v4 as uuidv4 } from 'uuid';
import type { TopicGroup } from 'app/types/TopicTypes';
import { useState } from 'react';

export const initData: TopicGroup[] = [
  {
    id: uuidv4(),
    name: 'Fotos',
    tasks: [
      {
        id: uuidv4(),
        name: 'Fotos kopieren',
        status: 'done',
        progress: 1,
      },
      {
        id: uuidv4(),
        name: 'blabla..',
        status: 'todo',
        progress: 0,
      },
      {
        id: uuidv4(),
        name: 'Fotos sortieren',
        status: 'done',
        progress: 1,
      },
      {
        id: uuidv4(),
        name: 'Fotos sichern',
        status: 'todo',
        progress: 0,
      },
      {
        id: uuidv4(),
        name: 'Fotos auswählen',
        status: 'inProgress',
        progress: 0.1,
      },
    ],
    isCompleted: false,
  },
  {
    id: uuidv4(),
    name: 'Passworter',
    tasks: [],
    isCompleted: false,
  },
  {
    id: uuidv4(),
    name: 'Haushalt',
    tasks: [
      {
        id: uuidv4(),
        name: 'Fenster putzen',
        status: 'todo',
        progress: 0,
      },
    ],
    isCompleted: false,
  },
  {
    id: uuidv4(),
    name: 'task-orga App',
    tasks: [
      {
        id: uuidv4(),
        name: 'Struktur',
        status: 'inProgress',
        progress: 1,
      },
      {
        id: uuidv4(),
        name: 'Aufgabentabelle',
        status: 'inProgress',
        progress: 0.3,
      },
      {
        id: uuidv4(),
        name: 'backend',
        status: 'todo',
        progress: 0,
      },
    ],
    isCompleted: false,
  },
];

const useData = () => {
  const [data, setData] = useState<TopicGroup[]>(initData);

  async function getDataFromBackend() {
    // API

    const data = initData;

    return data;
  }

  async function saveData(data: TopicGroup[]) {
    localStorage.setItem('data', JSON.stringify(data));
  }

  async function getData() {
    if (localStorage.getItem('data')) {
      return JSON.parse(localStorage.getItem('data')!) as TopicGroup[];
    } else {
      return getDataFromBackend();
    }
  }

  return {
    data,
    setData,
    getDataFromBackend,
    saveData,
    getData,
  };
};

export default useData;
