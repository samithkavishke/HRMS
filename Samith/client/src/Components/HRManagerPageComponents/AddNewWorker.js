import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate } from "react-router-dom";
import Axios from "axios";
import { AppBar, Toolbar } from "@mui/material";

const theme = createTheme();

export default function AddNewWorker({ workerData, setWorkerData }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    Axios.post("http://localhost:3001/AddNewWorker", {
      employee_id: data.get("employee_id"),
      job_title: data.get("job_title"),
      pay_grade: data.get("pay_grade"),
      employee_status: data.get("employee_status"),
      contract_period: data.get("contract_period"),
      department: data.get("department"),
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
        {/* <AppBar position="relative" color='primary'>
          <Toolbar>
            <Button href="http://localhost:3000/Home" variant='contained' color='info'>Home</Button>
          </Toolbar>
        </AppBar> */}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Typography component="h1" variant="h2" align="center">
            Add New Employee
          </Typography> */}
          <Box
            // component="form"
            noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="employee_id"
                  required
                  fullWidth
                  id="employee_id"
                  label="Employee ID"
                  defaultValue={workerData.employee_id}
                  onChange={(e) => {
                    setWorkerData({
                      ...workerData,
                      employee_id: e.target.value,
                    });
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="job_title"
                  required
                  fullWidth
                  id="job_title"
                  label="Job Title"
                  defaultValue={workerData.job_title}
                  onChange={(e) => {
                    setWorkerData({
                      ...workerData,
                      job_title: e.target.value,
                    });
                  }}
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  defaultValue={workerData.pay_grade}
                  id="pay_grade"
                  label="Pay Grade"
                  name="pay_grade"
                  onChange={(e) => {
                    setWorkerData({
                      ...workerData,
                      pay_grade: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="employee_status"
                  label="Employee Status"
                  id="employee_status"
                  autoComplete="employee_status"
                  defaultValue={workerData.employee_status}
                  onChange={(e) => {
                    setWorkerData({
                      ...workerData,
                      employee_status: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contract_period"
                  label="Contract Period"
                  id="contract_period"
                  autoComplete="contract_period"
                  defaultValue={workerData.contract_period}
                  onChange={(e) => {
                    setWorkerData({
                      ...workerData,
                      contract_period: e.target.value,
                    });
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="department"
                  label="Department"
                  id="department"
                  autoComplete="department"
                  defaultValue={workerData.department}
                  onChange={(e) => {
                    setWorkerData({
                      ...workerData,
                      department: e.target.value,
                    });
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
