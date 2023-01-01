import React, { useState, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import PersistentDrawerLeft from "./Components/UserPageComponents/DashBoard";
import SignIn from "./Components/LoginPageComponents/Login";
import { LoginContext } from "./Helper/UserContext";
import { useCookies } from "react-cookie";

import SignUp from "./Components/SignupPageComponents/Signup";
import Reports from "./Components/AdminPageComponents/FilterPage";


function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [loggedIn, setLoggedIn] = useState(Boolean(cookies.token));

  return (
    <BrowserRouter>
      <LoginContext.Provider
        value={{ loggedIn, setLoggedIn, cookies, setCookie, removeCookie }}
      >
        <Routes>
          <Route path="/Filter" element={<Reports />}></Route>
          <Route path="/Signup" element={<SignUp />}></Route>
          <Route path="/Home" element={<PersistentDrawerLeft />}></Route>
          <Route path="/" element={<SignIn />}></Route>
        </Routes>
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;
