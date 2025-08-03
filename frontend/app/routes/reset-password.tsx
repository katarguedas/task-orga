import { useFetcher } from "react-router";

export default function ResetPassword() {

  const fetcher = useFetcher();


  return (
    <main className="flex flex-col flex-wrap content-center" >
      <h1 className="text-2xl text-center m-4" >Passwort zurücksetzen</h1>
      <fetcher.Form
        method="post"
        className="flex flex-col shadow-lg border border-gray-400 rounded-2xl p-3 m-2"
      >
        <label className="w-55 pt-3" >Deine Benutzer E-Mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border-2 border-violet-500 w-60"
        />
        <button
          type="submit"
          className="font-bold text-fuchsia-50 bg-fuchsia-500 w-40 m-5 py-1 self-center"
        >
          weiter
        </button>
      </fetcher.Form>
    </main>
  )
}