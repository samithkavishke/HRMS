import React, { useState } from "react";
import { BrowserRouter, Outlet } from "react-router-dom";
import { Route, Routes } from "react-router-dom";

import PersistentDrawerLeft from "./Components/UserPageComponents/DashBoard";
import SignIn from "./Components/LoginPageComponents/Login";
import { LoginContext, UserContext } from "./Helper/UserContext";

import { useCookies } from "react-cookie";

import SignUp from "./Components/SignupPageComponents/Signup";
import Reports from "./Components/ManagerPageComponents/FilterPage";
import NewUser from "./Components/HRManagerPageComponents/AddNewWorker";
import AddEmergencyInfo from "./Components/HRManagerPageComponents/AddEmergencyInfo";
import Welcome from "./Components/WelcomePageComponents/Welcome";
import AddPersonalInfo from "./Components/HRManagerPageComponents/AddPersonalInfo";
import EditDetails from "./Components/HRManagerPageComponents/EditWoker";
import AddNewUser from "./Components/HRManagerPageComponents/AddNewUser";
import AddDependent from "./Components/HRManagerPageComponents/AddDependent";

import ChangeTable from "./Components/AdminPageComponents/AlterTable";
import ChangeSalary from "./Components/HRManagerPageComponents/ChangeSalary";
import ChangeBranchInfo from "./Components/HRManagerPageComponents/ChangeBranchInfo";
import ChangeDependents from "./Components/HRManagerPageComponents/ChangeDependents";
import LeaveForm from "./Components/UserPageComponents/LeaveApplication";

import LeaveApplicationTable from "./Components/HRManagerPageComponents/AcceptLeave";
import DepartmentLeaves from "./Components/Reports/TotalLeaves";

import {
  GuestAuth,
  ManagerAuth,
  UserAuth,
  AdminAuth,
  ProfileAuth,
} from "./Components/RouteAuth/Auth";
import HRDashboard from "./Components/HRManagerPageComponents/HRDashboard";
// import LeaveForm from "./Components/UserPageComponents/LeaveApplication copy";

import UserProfile from "./Components/UserPageComponents/Profile";

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

            {/* Routes accessible by regular employee */}
            <Route element={<UserAuth />}>
              <Route
                path="/Home"
                element={
                  user === "user" ? <PersistentDrawerLeft /> : <HRDashboard />
                }
              ></Route>
              <Route path="/LeaveApplication" element={<LeaveForm />}></Route>
            </Route>

            {/* Routes accessible by hrm */}
            <Route element={<ManagerAuth />}>
              <Route
                path="/DepartmentLeaves"
                element={<DepartmentLeaves />}
              ></Route>
              <Route path="/LeaveForm" element={<LeaveForm />}></Route>
              <Route
                path="/LeaveApplicationTable"
                element={<LeaveApplicationTable />}
              ></Route>
              <Route
                path="/ChangeDependents"
                element={<ChangeDependents />}
              ></Route>
              <Route
                path="/ChangeBranchInfo"
                element={<ChangeBranchInfo />}
              ></Route>
              <Route path="/ChangeSalary" element={<ChangeSalary />}></Route>
              <Route path="/AddNewUser" element={<AddNewUser />}></Route>
              <Route path="/EditDetails" element={<EditDetails />}></Route>
              <Route
                path="/AddPersonalInfo"
                element={<AddPersonalInfo />}
              ></Route>
              <Route
                path="/AddEmergencyInfo"
                element={<AddEmergencyInfo />}
              ></Route>
              <Route path="/Newuser" element={<NewUser />}></Route>
              <Route path="/Filter" element={<Reports />}></Route>
              <Route path="/AddDependent" element={<AddDependent />}></Route>
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
