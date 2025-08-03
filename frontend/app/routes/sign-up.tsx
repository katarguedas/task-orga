import { useFetcher, data, Link } from "react-router";
import type { Route } from "./+types/sign-in";
import axios from "axios";
import * as z from "zod";

const Credentials = z.object({
  email: z.email("Ungültige E-Mail Adresse"),
  password: z.string()
    .trim()
    .min(8, "Passwort muss aus mind. 8 Zeichen bestehen."),
  passwordRepeat: z.string()
    .trim()
    .min(8, "Passwort muss aus mind. 8 Zeichen bestehen.")
})



export async function clientLoader({ params }: Route.ClientLoaderArgs) {

}


export async function clientAction({ request }: Route.ClientActionArgs) {

  const formData = await request.formData();
  const errors = { email: "", password: "", passwordRepeat: "" };

  const credentials = {
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    passwordRepeat: String(formData.get("password-repeat")),
  }

  const zRes = Credentials.safeParse(credentials)


  if (zRes.success && credentials.password === credentials.passwordRepeat) {
    // axios.post("..../auth/sign-up", credentials, {
    //   headers: { "Content-Type": "application/json" }
    // },
    // ).then(function (response) {
    //   console.log(response)
    // })
    //  .catch(function (error) {console.log("error: ",error)})
  } else if (zRes.error) {
    for (let i = 0; i < zRes.error.issues.length; i++) {
      Object.keys(errors).forEach((key) => {
        if (key === zRes.error.issues[i].path[0]) {
          console.log("key: ", key)
          console.log("errors: ", errors)
          errors[key as keyof typeof errors] = zRes.error.issues[i].message
        }
      })
    }
  }

  console.log(errors)


  if (Object.keys(errors).length > 0) {
    return data({ errors }, { status: 400 });
  }
  return (false)
}


export default function SignUp() {

  const fetcher = useFetcher();
  const errors = fetcher.data?.errors;


  return (
    <main className="flex flex-col  flex-wrap content-center" >
      <h1 className="text-2xl text-center m-4" >Registrieren</h1>
      <fetcher.Form
        method="post"
        className="flex flex-col shadow-lg border border-gray-400 rounded-2xl p-3 m-2"
      >
        <label className="w-55 pt-3" >Benutzer E-Mail</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="border-2 border-fuchsia-400 w-60"
        />
        {errors?.email ? <p className="text-red-600">{errors.email}</p> : null}
        <label className="w-55 pt-3" >Passwort</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="off"
          required
          className="border-2 border-fuchsia-400 w-60"
        />
        {errors?.password ? <p className="text-red-600" >{errors.password}</p> : null}
        <label className="w-55 pt-3" >Passwort wiederholen</label>
        <input
          id="password-repeat"
          name="password-repeat"
          type="password"
          autoComplete="off"
          required
          className="border-2 border-fuchsia-400 w-60"
        />
        {errors?.passwordRepeat ? <p className="text-red-600">{errors.passwordRepeat}</p> : null}
        <button
          type="submit"
          className="font-bold text-fuchsia-50 bg-fuchsia-500 w-40 m-5 py-1 self-center"
        >
          einloggen
        </button>
      </fetcher.Form>
      <div className="text-center">Du hast bereits ein Konto? <Link to={"/sign-in"} className="font-semibold text-blue-600 " >Anmelden</Link>
      </div>
    </main >

  )
}