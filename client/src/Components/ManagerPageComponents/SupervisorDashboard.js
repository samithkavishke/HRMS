import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ListItemText from "@mui/material/ListItemText";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LogoutIcon from "@mui/icons-material/Logout";
import FeedIcon from "@mui/icons-material/Feed";
import AddTaskIcon from "@mui/icons-material/AddTask";
import GroupsIcon from "@mui/icons-material/Groups";
import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import { LoginContext, UserContext } from "../../Helper/UserContext";

import LeaveApplicationTable from "../HRManagerPageComponents/AcceptLeave";
import LeaveForm from "../UserPageComponents/LeaveApplication";
import MainProfile from "../UserPageComponents/ProfilePage/ProfileViewPage";
import ViewSubordinates from "./ViewSubordinates";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function SupervisorDashboard() {
  const { loggedIn, setLoggedIn, removeCookie } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [activeFeature, setActiveFeature] = useState("Dashboard");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dashboardContent = (
    <Main open={open}>
      <DrawerHeader />
      <Typography variant="h1">Hey {user}</Typography>
    </Main>
  );

  console.log(loggedIn);
  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="secondary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Jupiter Human Resource Manager
          </Typography>
          <IconButton color="inherit" edge="end">
            <NotificationsActiveIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton
            onClick={() => {
              setActiveFeature("Dashboard");
            }}
          >
            <ListItemIcon>
              <DashboardCustomizeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              setActiveFeature("Profile");
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              setActiveFeature("Leave Application");
            }}
          >
            <ListItemIcon>
              <FeedIcon />
            </ListItemIcon>
            <ListItemText primary="Leave Application" />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              setActiveFeature("View Subordinate Details");
            }}
          >
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="View Subordinate Details" />
          </ListItemButton>
          {/* <UserProfile2 /> */}
          <ListItemButton
            onClick={() => {
              setActiveFeature("Approve Leave Forms");
            }}
            href=""
          >
            <ListItemIcon>
              <AddTaskIcon />
            </ListItemIcon>
            <ListItemText primary="Approve Leave Forms" />
          </ListItemButton>
        </List>
        <Divider />
        <List>
          <ListItemButton
            component={Link}
            to={"/"}
            onClick={() => {
              removeCookie("depends", []);
              removeCookie("emp_id", []);
              removeCookie("user_type", []);
              setLoggedIn(false);
              setUser("guest");
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="LogOut" />
          </ListItemButton>
        </List>
      </Drawer>
      {activeFeature === "Dashboard" && dashboardContent}
      {activeFeature === "Approve Leave Forms" && <LeaveApplicationTable />}
      {/* {activeFeature === "Leave Application" && <EditDetails />} */}
      {activeFeature === "Profile" && <MainProfile />}
      {activeFeature === "View Subordinate Details" && <ViewSubordinates />}
      {activeFeature === "Leave Application" && <LeaveForm />}
    </Box>
  );
}
