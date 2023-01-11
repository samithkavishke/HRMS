import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import { AppBar, Toolbar } from "@mui/material";
import AddDependent from "./AddDependent";
import AddNewUser from "./AddNewUser";
import AddEmergencyInfo from "./AddEmergencyInfo";
import AddNewWorker from "./AddNewWorker";
import AddPersonalInfo from "./AddPersonalInfo";

const theme = createTheme();

export default function AddEmployee() {
  const title = [
    "Add new worker",
    "Provide Personal Info",
    "Provide Emergency Info",
    "Provide Dependant Info",
  ];
  const [page, setPage] = useState(0);
  const [dependantData, setDependantData] = useState({
    employee_contact: "",
    contact_first_name: "",
    contact_last_name: "",
  });

  const [personalData, setPersonalData] = useState({
    first_name: "",
    last_name: "",
    address_line_1: "",
    address_line_2: "",
    town: "",
    contact_number: "",
    birthdate: "",
    marital_status: "",
    gender: "",
  });

  const [emergencyData, setEmergencyData] = useState({
    ec_emp_contact: "",
    ec_first_name: "",
    ec_last_name: "",
    ec_phone_number: "",
    ec_relation: "",
  });

  const [userData, setUserData] = useState({
    employee_id: "",
    username: "",
    password: "",
    user_type: "",
    branch_code: "",
  });

  const submit = () => {
    // Submit userdata, emergencyData, personalData, dependantData
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <AppBar position="relative" color="primary">
          <Toolbar>
            <Button
              href="http://localhost:3000/Home"
              variant="contained"
              color="info"
            >
              Home
            </Button>
            <Button
              onClick={() =>
                console.log(
                  personalData,
                  userData,
                  emergencyData,
                  dependantData
                )
              }
            >
              Log
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h2" align="center">
            {title[page]}
          </Typography>
          {page === 0 && (
            <AddNewWorker userData={userData} setUserData={setUserData} />
          )}
          {page === 1 && (
            <AddPersonalInfo
              personalData={personalData}
              setPersonalData={setPersonalData}
            />
          )}
          {page === 2 && (
            <AddEmergencyInfo
              emergencyData={emergencyData}
              setEmergencyData={setEmergencyData}
            />
          )}
          {page === 3 && (
            <AddDependent
              dependantData={dependantData}
              setDependantData={setDependantData}
            />
          )}
          <Box component="form" noValidate onSubmit={2} sx={{ mt: 3 }}>
            <Button
              disabled={page === 0}
              onClick={() => {
                setPage((page) => page - 1);
              }}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Previous
            </Button>
            {page === title.length - 1 ? (
              <Button
                onClick={() => {
                  submit();
                }}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            ) : (
              <Button
                disabled={page === title.length - 1}
                onClick={() => {
                  setPage((page) => page + 1);
                }}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Next
              </Button>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
