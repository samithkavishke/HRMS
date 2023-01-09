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


import { GuestAuth, ManagerAuth, UserAuth } from "./Components/RouteAuth/Auth";
import Axios from "axios";
import EditCustomDetails from "./Components/CustomAttrinutePageComponents/AddCustomValues";
import CustomizeTable from "./Components/CustomAttrinutePageComponents/CustomizeTable";
import HRDashboard from "./Components/HRManagerPageComponents/HRDashboard";
// import LeaveForm from "./Components/UserPageComponents/LeaveApplication copy";


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [loggedIn, setLoggedIn] = useState(Boolean(cookies.token));
  const [user, setUser] = useState("hrm"); // guest, hrm, user

  return (
    <BrowserRouter>

      <UserContext.Provider value={{ user, setUser }}>
        <LoginContext.Provider
          value={{ loggedIn, setLoggedIn, cookies, setCookie, removeCookie }}
        >
          <Routes>
            <Route element={<UserAuth />}>
              <Route path="/Home" element={<PersistentDrawerLeft />}></Route>
            </Route>
            <Route element={<ManagerAuth />}>
              <Route path="/Home" element={<PersistentDrawerLeft />}></Route>
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
              <Route path="/ChangeTable" element={<ChangeTable />}></Route>
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

            <Route element={<GuestAuth />}>
              {/* <GuestAuth /> */}
              <Route path="/Signup" element={<SignUp />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/" element={<Welcome />} />
            </Route>
            <Route path="/403" element={<h1>Access denied</h1>} />
          </Routes>
        </LoginContext.Provider>
      </UserContext.Provider>


    </BrowserRouter>
  );
}

export default App;
