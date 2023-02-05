import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./style.css";
import "animate.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Parse from "parse/dist/parse.min";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Error404 from "./components/Error404/Error404";
import ProfilePage from "./components/Profile/ProfilePage";
import About from "./components/About/About.js";
import Events from "./components/Events/Events.js";
import "./style.css";
import Partners from "./components/Partners/Partners.js";
import Event from "./components/Event/Event.js";
import Application from "./components/Application/Application.js";
import { useLocation } from "react-router-dom";

const PARSE_APPLICATION_ID = process.env.REACT_APP_PARSE_APPLICATION_ID;
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Error404 />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="/profile-page" element={<ProfilePage />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<Event />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/enter" element={<Application />} />
      </Routes>
    </>
  );
}

export default App;
