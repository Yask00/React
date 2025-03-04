import { Routes, Route, Link } from "react-router";
import Step1 from "./step1";

export default function Login() {
    return (
      <div className="flex flex-col">
        Login inside layout
        {/* You can also use components that match the URL to elements anywhere in the component tree: */}
        <Link to="/login/step1">To step 1 route in login</Link>
        <Routes>
            <Route path="/step1" element={<Step1 />} />
            <Route path="/step2" element={<>Step 2 inside Login</>} />
        </Routes>

      </div>
    );
  }
  
  