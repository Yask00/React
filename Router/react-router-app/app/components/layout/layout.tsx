import { Outlet } from "react-router";

export default function Layout() {
    return (
      <main className="flex items-center justify-center pt-16 pb-4">
        layout parent -
        <Outlet />
      </main>
    );
  }
  
  