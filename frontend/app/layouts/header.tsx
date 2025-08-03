import { Link } from "react-router-dom";

export default function () {
  return (
    <header className="flex border-b-1 my-1 mx-2 pb-1 h-9 text-center" >
      <Link to="/" className="text-cyan-50 px-5 bg-cyan-600 border rounded-full" >home</Link>
    </header>
  )
}