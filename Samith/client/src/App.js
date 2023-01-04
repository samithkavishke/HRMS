import React, { useState, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import PersistentDrawerLeft from "./Components/UserPageComponents/DashBoard";
import SignIn from "./Components/LoginPageComponents/Login";
import { LoginContext } from "./Helper/UserContext";
import SignUp from "./Components/SignupPageComponents/Signup";
import Welcome from "./Components/WelcomePageComponents/Welcome";
import Reports from "./Components/AdminPageComponents/FilterPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(true); // should be set to false

  const providerValue = useMemo(
    () => ({ loggedIn, setLoggedIn }),
    [loggedIn, setLoggedIn]
  );
  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
        <Routes>
          <Route path="/Filter" element={<Reports />}></Route>
          <Route path="/Signup" element={<SignUp />}></Route>
          <Route path="/Home" element={<PersistentDrawerLeft />}></Route>
          <Route path="/Signin" element={<SignIn />}></Route>
          <Route path="/" element={<Welcome />}></Route>
        </Routes>
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;
