import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import CakeIcon from "@mui/icons-material/Cake";
import Axios from "axios";
import { useState, useEffect, useContext } from "react";
import { LoginContext, UserContext } from "../../../Helper/UserContext";
import { Button } from "@mui/material";
import UserProfile from "./ProfileViewPage";
// import ChangePassword from "./ProfileViewPage";
import ChangePassword from "./ChangePasswordPage";

export default function MainProfile() {
  const { cookies } = useContext(LoginContext);
  const employee_id = cookies.emp_id;

  const [mainPageView, setMainPageView] = useState(true);

  return (
    <div>
      {mainPageView && <UserProfile updateValue={setMainPageView} />}
      {!mainPageView && <ChangePassword updateValue={setMainPageView} />}
    </div>
  );
}
