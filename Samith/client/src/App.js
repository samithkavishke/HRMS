import React, { useState, useMemo } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import PersistentDrawerLeft from "./Components/UserPageComponents/DashBoard";
import SignIn from "./Components/LoginPageComponents/Login";
import { LoginContext } from "./Helper/UserContext";
import SignUp from "./Components/SignupPageComponents/Signup";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const providerValue = useMemo(
    () => ({ loggedIn, setLoggedIn }),
    [loggedIn, setLoggedIn]
  );
  return (
    <BrowserRouter>
      <LoginContext.Provider value={{ loggedIn, setLoggedIn }}>
        <Routes>
          <Route path="/Signup" element={<SignUp />}></Route>
          <Route path="/Home" element={<PersistentDrawerLeft />}></Route>
          <Route path="/" element={<SignIn />}></Route>
        </Routes>
      </LoginContext.Provider>
    </BrowserRouter>
  );
}

export default App;
