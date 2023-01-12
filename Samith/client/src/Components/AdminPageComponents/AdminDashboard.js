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
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import ListItemText from "@mui/material/ListItemText";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LogoutIcon from "@mui/icons-material/Logout";
import FeedIcon from "@mui/icons-material/Feed";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AddIcon from "@mui/icons-material/Add";
import PublicIcon from "@mui/icons-material/Public";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircle from "@mui/icons-material/AccountCircle";
import TableViewIcon from '@mui/icons-material/TableView';
import BusinessIcon from '@mui/icons-material/Business';
import EditIcon from "@mui/icons-material/Edit";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Link, Navigate, redirect } from "react-router-dom";

import { LoginContext, UserContext } from "../../Helper/UserContext";

import AddNewUser from "../HRManagerPageComponents/AddNewUser";
import LeaveApplicationTable from "../HRManagerPageComponents/AcceptLeave";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EditDetails from "../HRManagerPageComponents/EditWoker";
import LeaveForm from "../UserPageComponents/LeaveApplication";
import AddEmployee from "../HRManagerPageComponents/AddEmployee/AddEmployee";
import MainProfile from "../UserPageComponents/ProfilePage/Profile";
import ChangeTable from "./AlterTable";
import EditCustomDetails from "../CustomAttrinutePageComponents/AddCustomValues";
import CustomizeTable from "../CustomAttrinutePageComponents/CustomizeTable";
import ChangeBranchInfo from "../HRManagerPageComponents/ChangeTables/ChangeBranchInfo";

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

export default function AdminDashboard() {
  const { loggedIn, setLoggedIn, removeCookie } = useContext(LoginContext);
  const { user, setUser } = useContext(UserContext);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [dashBoardSelect, enableDashboard] = useState(true);
  const [editDetailsSelect, enableEditDetails] = useState(false);
  const [leaveApproveSelect, enableLeaveApprove] = useState(false);
  const [signoutSelect, enableSignout] = useState(false);
  const [profileSelect, enableProfile] = useState(false);
  const [ApplicationSelect, enableApplication] = useState(false);
  const [NewEmployeeSelect, enableNewEmployee] = useState(false);
  const [NewUserSelect, enableNewUser] = useState(false);
  const [CustomAttrSelect, enableCustomAttr] = useState(false);
  const [BranchInfoSelect, enableBranchInfo] = useState(false);

  const toggleDashboard = () => {
    enableDashboard(true);
    enableProfile(false);
    enableApplication(false);
    enableEditDetails(false);
    enableLeaveApprove(false);
    enableSignout(false);
    enableNewEmployee(false);
    enableNewUser(false);
    enableCustomAttr(false);
    enableBranchInfo(false);
  };
  const toggleEditDetails = () => {
    enableDashboard(false);
    enableProfile(false);
    enableApplication(false);
    enableEditDetails(true);
    enableLeaveApprove(false);
    enableSignout(false);
    enableNewEmployee(false);
    enableNewUser(false);
    enableCustomAttr(false);
    enableBranchInfo(false);
  };
  const toggleApplication = () => {
    enableDashboard(false);
    enableProfile(false);
    enableApplication(true);
    enableEditDetails(false);
    enableLeaveApprove(false);
    enableSignout(false);
    enableNewEmployee(false);
    enableNewUser(false);
    enableCustomAttr(false);
    enableBranchInfo(false);
  };
  const toggleLeaveApprove = () => {
    enableDashboard(false);
    enableProfile(false);
    enableApplication(false);
    enableEditDetails(false);
    enableLeaveApprove(true);
    enableSignout(false);
    enableNewEmployee(false);
    enableNewUser(false);
    enableCustomAttr(false);
    enableBranchInfo(false);
  };
  const toggleSignout = () => {
    enableDashboard(false);
    enableProfile(false);
    enableApplication(false);
    enableEditDetails(false);
    enableLeaveApprove(false);
    enableSignout(true);
    enableNewEmployee(false);
    enableNewUser(false);
    enableCustomAttr(false);
    enableBranchInfo(false);
  };

  const toggleProfile = () => {
    enableDashboard(false);
    enableProfile(true);
    enableApplication(false);
    enableEditDetails(false);
    enableLeaveApprove(false);
    enableSignout(true);
    enableNewEmployee(false);
    enableNewUser(false);
    enableCustomAttr(false);
    enableBranchInfo(false);
  };

  const toggleNewEmployee = () => {
    enableDashboard(false);
    enableProfile(false);
    enableApplication(false);
    enableEditDetails(false);
    enableLeaveApprove(false);
    enableSignout(false);
    enableNewEmployee(true);
    enableNewUser(false);
    enableCustomAttr(false);
    enableBranchInfo(false);
  };
  const toggleNewUser = () => {
    enableDashboard(false);
    enableProfile(false);
    enableApplication(false);
    enableEditDetails(false);
    enableLeaveApprove(false);
    enableSignout(false);
    enableNewEmployee(false);
    enableNewUser(true);
    enableCustomAttr(false);
    enableBranchInfo(false);
  };

  const toggleCustomAttr = () => {
    enableDashboard(false);
    enableProfile(false);
    enableApplication(false);
    enableEditDetails(false);
    enableLeaveApprove(false);
    enableSignout(false);
    enableNewEmployee(false);
    enableNewUser(false);
    enableCustomAttr(true);
    enableBranchInfo(false);
  };

  const toggleBranchInfo = () => {
    enableDashboard(false);
    enableProfile(false);
    enableApplication(false);
    enableEditDetails(false);
    enableLeaveApprove(false);
    enableSignout(false);
    enableNewEmployee(false);
    enableNewUser(false);
    enableCustomAttr(false);
    enableBranchInfo(true);
  };

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
    //console.log(loggedIn);
    return <Navigate to="/" />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} color="warning">
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
          <IconButton
            color="inherit"
            edge="end"
          ><NotificationsActiveIcon/></IconButton>
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
          <ListItemButton onClick={toggleDashboard}>
            <ListItemIcon>
              <DashboardCustomizeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton onClick={toggleProfile}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>

          <ListItemButton onClick={toggleApplication} href="">
            <ListItemIcon>
              <FeedIcon />
            </ListItemIcon>
            <ListItemText primary="Leave Application" />
          </ListItemButton>

          <ListItemButton onClick={toggleNewEmployee}>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add New Employee" />
          </ListItemButton>

          <ListItemButton onClick={toggleNewUser}>
            <ListItemIcon>
              <PublicIcon />
            </ListItemIcon>
            <ListItemText primary="Add New User Account" />
          </ListItemButton>
          {/* <UserProfile2 /> */}
          {/* <ListItemButton onClick={toggleLeaveApprove} href="">
            <ListItemIcon>
              <AddTaskIcon />
            </ListItemIcon>
            <ListItemText primary="Approve Leave Forms" />
          </ListItemButton> */}

          <ListItemButton onClick={toggleCustomAttr} href="">
            <ListItemIcon>
              <TableViewIcon />
            </ListItemIcon>
            <ListItemText primary="Add New Custom Fields" />
          </ListItemButton>

          <ListItemButton onClick={toggleBranchInfo} href="">
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Add/View Branch Info" />
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
      {dashBoardSelect && dashboardContent}
      {leaveApproveSelect && <LeaveApplicationTable />}
      {editDetailsSelect && <EditDetails />}
      {profileSelect && <MainProfile />}
      {ApplicationSelect && <LeaveForm />}
      {NewEmployeeSelect && <AddEmployee />}
      {NewUserSelect && <AddNewUser />}
      {CustomAttrSelect && <CustomizeTable/>}
      {BranchInfoSelect && <ChangeBranchInfo/>}

    </Box>
  );
}
