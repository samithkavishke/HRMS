import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AppBar, Toolbar } from "@mui/material";
import AddDependent from "./AddDependent";
import AddEmergencyInfo from "./AddEmergencyInfo";
import AddNewWorker from "./AddNewWorker";
import AddPersonalInfo from "./AddPersonalInfo";

import Axios from "axios";

const theme = createTheme();

export default function AddEmployee() {
  const title = [
    "Add New Employee",
    "Provide Personal Info",
    "Provide Emergency Info",
    "Provide Dependant Info",
  ];
  const [page, setPage] = useState(0);
  const [dependantData, setDependantData] = useState({
    dependant_id: "",
    dependant_first_name: "",
    dependant_last_name: "",
  });

  const [personalData, setPersonalData] = useState({
    first_name: "",
    last_name: "",
    address_line_1: "",
    address_line_2: "",
    town: "",
    contact_number: "",
    birthdate: new Date(),
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

  const [workerData, setWorkerData] = useState({
    employee_id: "",
    job_title: "",
    pay_grade: "",
    employee_status: "",
    contract_period: "",
    department: "",
    supervisor: "",
  });


  const submit = () => {
    console.log(dependantData);
    Axios.post("http://localhost:3001/AddEmployeeInfo", {
      workerData: workerData,
      emergencyData: emergencyData,
      personalData: personalData,
      dependantData: dependantData,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
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
                  workerData,
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
            <AddNewWorker
              workerData={workerData}
              setWorkerData={setWorkerData}
            />
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
          <Box component={"form"} noValidate sx={{ mt: 3 }}>
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
                onClick={submit}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            ) : (
              <Button
                disabled={!workerData.employee_id}
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
