import { Outlet } from "react-router";

export function Concerts() {
    return (
      <main className="flex items-center justify-center pt-16 pb-4">
        concerts
        <Outlet />
      </main>
    );
  }
  
  