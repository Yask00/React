import type { Route } from "./+types/home";
import { Concerts }  from "../components/concerts/home"; 

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "" },
  ];
}

export default function Home() {
  return <Concerts />;
}
