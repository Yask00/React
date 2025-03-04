import type { Route } from "./+types/home";
import { Dashboard } from "../components/dashboard/dashboard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "" },
  ];
}

export default function Home() {
  return <Dashboard />;
}
