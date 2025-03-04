import type { Route } from "./+types/home";
import ConcertsTrading  from "../components/concerts/trading";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "" },
  ];
}

// NOT USED !!!
export default function Home() {
  return <ConcertsTrading />;
}
