
const tableHeaderCols = [
  {
    id: "header-todo",
    content: "To Do",
    color: "bg-red-400",
    corner: "rounded-tl-xl"
  },
  {
    id: "header-inProgress",
    content: "In Progress",
    color: "bg-yellow-300",
    corner: ""
  },
  {
    id: "header-done",
    content: "Done",
    color: "bg-green-300",
    corner: "rounded-tr-2xl"
  }
]

export default function TableHeader() {


  return (
    <>
      {
        tableHeaderCols.map((col) => (
        <div
          key={col.id}
          className={`${col.color}`+" w-full text-lg text-center py-2.5 justify-self-center row-start-1 row-end-1 font-semibold " +`${col.corner}`}
        >{col.content}</div>
        ))
      }
    </>
  )
}