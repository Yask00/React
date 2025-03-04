import { useEffect } from 'react'
import './App.css'
import Navigation from "./components/Navigation/Navigation";
import { Outlet } from "react-router";
import { useLocation } from "react-router";

export default function App() {
  let location = useLocation();
  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <>
     <Navigation />
     <div className="content">
        APP COMPONENT
        <Outlet/>
     </div>
    </>
  )
}
