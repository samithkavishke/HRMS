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
import EditLocationAltIcon from "@mui/icons-material/EditLocationAlt";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import ListItemText from "@mui/material/ListItemText";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LogoutIcon from "@mui/icons-material/Logout";
import FeedIcon from "@mui/icons-material/Feed";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddIcon from "@mui/icons-material/Add";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EditIcon from "@mui/icons-material/Edit";
import SummarizeIcon from "@mui/icons-material/Summarize";
import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";

import { LoginContext, UserContext } from "../../Helper/UserContext";

import LeaveApplicationTable from "./AcceptLeave";
import EditDetails from "./EditWoker";
import LeaveForm from "../UserPageComponents/LeaveApplication";
import AddEmployee from "./AddEmployee/AddEmployee";
import MainProfile from "../UserPageComponents/ProfilePage/Profile";
import EditCustomDetails from "../CustomAttrinutePageComponents/AddCustomValues";
import ChangeSalary from "./ChangeTables/ChangeSalary";

import Reports from "../ManagerPageComponents/FilterPage";
import DepartmentLeaves from "../Reports/TotalLeaves";
import ChangeNumOfLeaves from "./ChangeNumOfLeaves";
// import ChangeBranchInfo from "./ChangeBranchInfo";

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
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function HRDashboard() {
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

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="success">
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
              setActiveFeature("Add New Employee");
            }}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add New Employee" />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              setActiveFeature("Edit Employee Details");
            }}
          >
            <ListItemIcon>
              <EditIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Employee Details" />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              setActiveFeature("Edit Custom Field Details");
            }}
          >
            <ListItemIcon>
              <EditLocationAltIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Custom Field Details" />
          </ListItemButton>
          {/* <UserProfile2 /> */}
          <ListItemButton
            onClick={() => {
              setActiveFeature("Approve Leave Forms");
            }}
          >
            <ListItemIcon>
              <AddTaskIcon />
            </ListItemIcon>
            <ListItemText primary="Approve Leave Forms" />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              setActiveFeature("Salary Details");
            }}
          >
            <ListItemIcon>
              <LocalAtmIcon />
            </ListItemIcon>
            <ListItemText primary="Salary Details" />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              setActiveFeature("Reports");
            }}
          >
            <ListItemIcon>
              <SummarizeIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setActiveFeature("Absent Count");
            }}
          >
            <ListItemIcon>
              <PeopleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Absent Count" />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              setActiveFeature("Set No. of Leaves");
            }}
          >
            <ListItemIcon>
              <RecentActorsIcon />
            </ListItemIcon>
            <ListItemText primary="Set No. of Leaves" />
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
      {activeFeature === "Profile" && <MainProfile />}
      {activeFeature === "Edit Employee Details" && <EditDetails />}
      {activeFeature === "Leave Application" && <LeaveForm />}
      {activeFeature === "Add New Employee" && <AddEmployee />}
      {activeFeature === "Edit Custom Field Details" && <EditCustomDetails />}
      {activeFeature === "Approve Leave Forms" && <LeaveApplicationTable />}
      {activeFeature === "Reports" && <Reports />}
      {activeFeature === "Salary Details" && <ChangeSalary />}
      {activeFeature === "Absent Count" && <DepartmentLeaves />}
      {activeFeature === "Set No. of Leaves" && <ChangeNumOfLeaves />}
    </Box>
  );
}
