import React, { useState, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import PersistentDrawerLeft from "./Components/UserPageComponents/DashBoard";
import SignIn from "./Components/LoginPageComponents/Login";
import { LoginContext } from "./Helper/UserContext";
import { useCookies } from "react-cookie";

import SignUp from "./Components/SignupPageComponents/Signup";
import Reports from "./Components/ManagerPageComponents/FilterPage";
import NewUser from "./Components/HRManagerPageComponents/AddNewWorker";
import AddEmergencyInfo from "./Components/HRManagerPageComponents/AddEmergencyInfo";
import Welcome from "./Components/WelcomePageComponents/Welcome";
import AddPersonalInfo from "./Components/HRManagerPageComponents/AddPersonalInfo";
// import Form from "./Components/HRManagerPageComponents/AcceptLeave";
import BankAccountDetails from "./Components/HRManagerPageComponents/EditWoker";
import EditDetails from "./Components/HRManagerPageComponents/EditWoker";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [loggedIn, setLoggedIn] = useState(Boolean(cookies.token));

  return (
    <BrowserRouter>
      <LoginContext.Provider
        value={{ loggedIn, setLoggedIn, cookies, setCookie, removeCookie }}
      >
        <Routes>
          <Route path="/EditDetails" element={<EditDetails />}></Route>

          {/* <Route path="/Form" element={<Form />}></Route> */}
          <Route path="/AddPersonalInfo" element={<AddPersonalInfo />}></Route>
          <Route
            path="/AddEmergencyInfo"
            element={<AddEmergencyInfo />}
          ></Route>
          <Route path="/Newuser" element={<NewUser />}></Route>
          <Route path="/Filter" element={<Reports />}></Route>
          {/* <Route path="/Signup" element={<SignUp />}></Route> */}
          <Route path="/Home" element={<PersistentDrawerLeft />}></Route>
          <Route path="/" element={<SignIn />}></Route>
          {/* <Route path="/" element={<Welcome />}></Route> */}
        </Routes>
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;
