import type { Route } from "./+types/home";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Task Organizer" },
    { name: "description", content: "Welcome to Task Organizer!" },
  ];
}

export default function Home() {

  console.log("test")

  return (
    <main>
      <h1>Home</h1>
      <div>********</div>
    </main>
  );
}
