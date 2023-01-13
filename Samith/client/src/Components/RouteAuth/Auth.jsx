import { useContext } from "react";
import { UserContext } from "../../Helper/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export const UserAuth = () => {
  const { loggedIn } = useContext(UserContext);

  if (loggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="SignIn" />;
  }
};

export const AdminAuth = () => {
  const { user } = useContext(UserContext);

  if (user === "admin") {
    return <Outlet />;
  } else if (user === "guest") {
    return <Navigate to="SignIn" />;
  } else {
    return <Navigate to="403" />;
  }
};

export const ManagerAuth = () => {
  const { user } = useContext(UserContext);

  if (user === "hrm" || user === "admin") {
    return <Outlet />;
  } else if (user === "guest") {
    return <Navigate to="SignIn" />;
  }
  return <Navigate to="403" />;
};

export const GuestAuth = () => {
  const { loggedIn } = useContext(UserContext);

  if (!loggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to="Home" />;
  }
};
