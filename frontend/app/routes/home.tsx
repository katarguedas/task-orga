import { useNavigate } from "react-router";
import type { Route } from "./+types/home";
import { useEffect } from "react";
import useAuth from "app/hooks/useAuth";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Task Organizer" },
    { name: "description", content: "Welcome to Task Organizer!" },
  ];
}

export default function Home() {

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard")
    }
  },[])

  return (
    <main className="flex flex-col flex-wrap content-center" >
      <div className="" >
        <div className="flex flex-col shadow-lg border border-gray-400 rounded-2xl p-3 m-2">
          <p className="text-center" >Noch kein Konto?</p>
          <button
            className="text-fuchsia-50 border rounded-full bg-fuchsia-700 px-1 py-1 m-1"
            onClick={() => navigate("/sign-up")}
          >
            registrieren
          </button>
        </div>
        <div className="flex flex-col shadow-lg border border-gray-400 rounded-2xl p-3 m-2" >
          <p>Du hast bereits ein Konto?</p>
          <button
            className="text-blue-50 border rounded-full bg-blue-700 px-1 py-1 m-1"
            onClick={() => navigate("/sign-in")}
          >
            zum Login
          </button>
        </div>

      </div>
    </main>
  );
}
