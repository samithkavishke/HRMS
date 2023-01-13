import React, { useState } from "react";
import { BrowserRouter, Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import PersistentDrawerLeft from "./Components/UserPageComponents/DashBoard";
import SignIn from "./Components/LoginPageComponents/Login";
import { LoginContext, UserContext } from "./Helper/UserContext";

import { useCookies } from "react-cookie";

import SignUp from "./Components/SignupPageComponents/Signup";
import Welcome from "./Components/WelcomePageComponents/Welcome";

import { GuestAuth, UserAuth } from "./Components/RouteAuth/Auth";
import HRDashboard from "./Components/HRManagerPageComponents/HRDashboard";
import SupervisorDashboard from "./Components/ManagerPageComponents/SupervisorDashboard";
import AdminDashboard from "./Components/AdminPageComponents/AdminDashboard";

export default function App() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "user_type",
    "emp_id",
    "depends",
  ]);
  const [loggedIn, setLoggedIn] = useState(
    cookies.user_type ? cookies.user_type !== "guest" : false
  );
  const [user, setUser] = useState(
    cookies.user_type ? cookies.user_type : "guest"
  );
  const [info, setInfo] = useState([]);
  console.log(user, loggedIn, info);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser, info, setInfo, loggedIn }}>
        <LoginContext.Provider
          value={{ loggedIn, setLoggedIn, cookies, setCookie, removeCookie }}
        >
          <Routes>
            {/* Routes accessible by logged in user */}
            <Route element={<UserAuth />}>
              <Route
                path="/Home"
                element={
                  user === "user" ? (
                    <PersistentDrawerLeft />
                  ) : user === "hrm" ? (
                    <HRDashboard />
                  ) : user === "supervisor" ? (
                    <SupervisorDashboard />
                  ) : (
                    <AdminDashboard />
                  )
                }
              ></Route>
            </Route>

            {/* Routes accessible when not logged in */}
            <Route element={<GuestAuth />}>
              <Route path="/Signup" element={<SignUp />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/" element={<Welcome />} />
            </Route>

            {/* Routes everyone can acess */}
            <Route path="/403" element={<h1>Access denied</h1>} />
          </Routes>
        </LoginContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  );
}
