import { useContext } from "react";
import { UserContext } from "../../Helper/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export const UserAuth = () => {
  const { user } = useContext(UserContext);

  if (user === "hrm" || user === "user") {
    return <Outlet />;
  } else {
    return <Navigate to="SignIn" />;
  }
};

export const ManagerAuth = () => {
  const { user } = useContext(UserContext);

  if (user === "hrm") {
    return <Outlet />;
  } else if (user === "user") {
    return <Navigate to="403" />;
  } else {
    return <Navigate to="SignIn" />;
  }
};

export const GuestAuth = () => {
  const { user } = useContext(UserContext);

  return user !== "guest" ? <Navigate to="Home" /> : <Outlet />;
};
