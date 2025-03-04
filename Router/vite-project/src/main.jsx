import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Concerts from "./components/Navigation/Concerts/Concerts";
import City from "./components/Navigation/Concerts/City";
import Trending from "./components/Navigation/Concerts/Trending";
import TrendingNew from "./components/Navigation/Concerts/Trending_new";
import NotFound from "./components/NotFound.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* */}
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {/* NESTED ROUTES */}
          <Route path="concerts">
            <Route index element={<Concerts />} />
            <Route path=":city" element={<City />} />

            {/* NO PATH = NO SEGMENT */}
            {/* <Route element={<></>}> */}

            {/* No ELEMENT only SEGMENT */}
            <Route exact path="trending">
              <Route index exact path="" element={<Trending />} />
              <Route exact path="new" element={<TrendingNew />} />
            </Route>
          </Route>
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
