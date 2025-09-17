

type Props = {
  inputValue: string,
  handleSubmit: React.FormEventHandler<HTMLFormElement>,
  handleChange:React.ChangeEventHandler<HTMLInputElement>,
}

export default function InputForm(props: Props) {


  return (
    <form onSubmit={props.handleSubmit} className="inline-block">
      <input
        value={props.inputValue}
        onChange={props.handleChange}
        className="border border-gray-400 rounded-lg px-1 mx-1 "
      />
      <button className="m-1 p-1 border border-gray-400 rounded-lg cursor-pointer hover:bg-green-50" type="submit">create</button>
    </form>
  )
}