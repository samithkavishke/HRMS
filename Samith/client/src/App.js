import React, { useState } from "react";
import { BrowserRouter, Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import PersistentDrawerLeft from "./Components/UserPageComponents/DashBoard";
import SignIn from "./Components/LoginPageComponents/Login";
import { LoginContext, UserContext } from "./Helper/UserContext";

import { useCookies } from "react-cookie";

import SignUp from "./Components/SignupPageComponents/Signup";
import Welcome from "./Components/WelcomePageComponents/Welcome";

import ChangeTable from "./Components/AdminPageComponents/AlterTable";

import LeaveApplicationTable from "./Components/HRManagerPageComponents/AcceptLeave";
import DepartmentLeaves from "./Components/Reports/TotalLeaves";
// Addnewworker/personalinfo/addemergencyinfo/adddependant

import {
  GuestAuth,
  ManagerAuth,
  UserAuth,
  AdminAuth,
  ProfileAuth,
} from "./Components/RouteAuth/Auth";
import HRDashboard from "./Components/HRManagerPageComponents/HRDashboard";
// import LeaveForm from "./Components/UserPageComponents/LeaveApplication copy";

import UserProfile from "./Components/UserPageComponents/ProfilePage/ProfileViewPage";
import SupervisorDashboard from "./Components/ManagerPageComponents/SupervisorDashboard";
import ViewSubordinates from "./Components/ManagerPageComponents/ViewSubordinates";
import AdminDashboard from "./Components/AdminPageComponents/AdminDashboard";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "user_type",
    "emp_id",
    "depends",
  ]);
  const [loggedIn, setLoggedIn] = useState(
    cookies.user_type ? cookies.user_type !== "guest" : false
  ); // Boolean(cookies.token)
  const [user, setUser] = useState(
    cookies.user_type ? cookies.user_type : "guest"
  ); // guest, hrm, user, supervisor, admin
  const [info, setInfo] = useState([]);
  console.log(user, loggedIn, info);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser, info, setInfo, loggedIn }}>
        <LoginContext.Provider
          value={{ loggedIn, setLoggedIn, cookies, setCookie, removeCookie }}
        >
          <Routes>
            {/* Profile Routes !!! NOT COMPLETE */}
            <Route element={<ProfileAuth />}>
              {/* <Route path={`/user-profile/:id`} element={<UserProfile />} /> */}
            </Route>
            {/* Routes accessible by admin */}
            <Route element={<AdminAuth />}>
              <Route path="/ChangeTable" element={<ChangeTable />}></Route>
            </Route>

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
              {/* <Route path="/LeaveApplication" element={<LeaveForm />}></Route> */}
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

export default App;
