
export type Task = {
  id: string,
  name: string,
  status: string,
  progress: number | undefined
}

export type TopicGroup = {
  id: string,
  name: string,
  tasks: Task[],
  isCompleted: false,
}
