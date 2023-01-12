import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Axios from "axios";

const theme = createTheme();

export default function AddNewWorker({ workerData, setWorkerData }) {
  const [supervisors, setSupervisors] = useState([]);

  console.log(supervisors);
  useEffect(() => {
    if (workerData.pay_grade !== "") {
      Axios.get(`http://localhost:3001/get_supervisors`, {
        params: {
          pay_grade: workerData.pay_grade,
          department: workerData.department,
        },
      })
        .then((response) => {
          if (response.data.result !== undefined) {
            setSupervisors(response.data.result);
          } else {
            setSupervisors([]);
          }

          // console.log(fields);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setSupervisors([]);
    }
  }, [workerData.pay_grade]);

  // useEffect(() => {
  //   if (workerData.pay_grade !== "") {
  //     Axios.get(`http://localhost:3001/get_supervisors`, {
  //       params: {
  //         pay_grade: workerData.pay_grade,
  //         department: workerData.department,
  //       },
  //     })
  //       .then((response) => {
  //         if (response.data.result !== undefined) {
  //           setSupervisors(response.data.result);
  //         } else {
  //           setSupervisors([]);
  //         }

  //         // console.log(fields);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   } else {
  //     setSupervisors([]);
  //   }
  // }, [workerData.employee]);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />

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

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel id="job_title" defaultValue={""}>
                Job Title
              </InputLabel>
              <Select
                id="job_title"
                value={workerData.job_title}
                label="Job Title"
                onChange={(e) => {
                  setWorkerData({
                    ...workerData,
                    job_title: e.target.value,
                  });
                }}
                defaultValue=""
              >
                <MenuItem value={"accountant"}>Accountant</MenuItem>
                <MenuItem value={"manager"}>Manager</MenuItem>
                <MenuItem value={"designer"}>Designer</MenuItem>
                <MenuItem value={"engineer"}>Engineer</MenuItem>
                <MenuItem value={"receptionist"}>Receptionist</MenuItem>
                <MenuItem value={"factory staff"}>Factory Staff</MenuItem>
                <MenuItem value={"supervisor"}>Supervisor</MenuItem>
                <MenuItem value={"clerk"}>Clerk</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel id="pay_grade" defaultValue={""}>
                Pay Grade
              </InputLabel>
              <Select
                id="pay_grade"
                value={workerData.pay_grade}
                label="Pay Grade"
                onChange={(e) => {
                  setWorkerData({
                    ...workerData,
                    pay_grade: e.target.value,
                  });
                }}
                defaultValue=""
              >
                <MenuItem value={"Level 1"}>Level 1</MenuItem>
                <MenuItem value={"Level 2"}>Level 2</MenuItem>
                <MenuItem value={"Level 3"}>Level 3</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel id="employee_status" defaultValue={""}>
                Employee Status
              </InputLabel>
              <Select
                id="employee_status"
                value={workerData.employee_status}
                label="Employee Status"
                onChange={(e) => {
                  setWorkerData({
                    ...workerData,
                    employee_status: e.target.value,
                  });
                }}
                defaultValue=""
              >
                <MenuItem value={"Employee"}>Employee</MenuItem>
                <MenuItem value={"Contract"}>Contract</MenuItem>
                <MenuItem value={"Intern"}>Intern</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel id="contract_period" defaultValue={""}>
                Contract Period
              </InputLabel>
              <Select
                id="contract_period"
                value={workerData.contract_period}
                label="Contract Period"
                onChange={(e) => {
                  setWorkerData({
                    ...workerData,
                    contract_period: e.target.value,
                  });
                }}
                defaultValue=""
              >
                <MenuItem value={"full-time"}>Full Time</MenuItem>
                <MenuItem value={"part-time"}>Part Time</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel id="department" defaultValue={""}>
                Department
              </InputLabel>
              <Select
                id="department"
                value={workerData.department}
                label="Department"
                onChange={(e) => {
                  setWorkerData({
                    ...workerData,
                    department: e.target.value,
                  });
                }}
                defaultValue=""
              >
                <MenuItem value={"finance"}>Finance</MenuItem>
                <MenuItem value={"manufacturing"}>Manufacturing</MenuItem>
                <MenuItem value={"IT"}>IT</MenuItem>
                <MenuItem value={"human resource"}>Human Resource</MenuItem>
                <MenuItem value={"logistics"}>Logistics</MenuItem>
                <MenuItem value={"sales"}>Sales</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormControl fullWidth>
              <InputLabel id="supervisor" defaultValue={""}>
                Supervisor
              </InputLabel>
              <Select
                id="supervisor"
                value={workerData.supervisor}
                label="Supervisor"
                onChange={(e) => {
                  setWorkerData({
                    ...workerData,
                    supervisor: e.target.value,
                  });
                }}
                defaultValue=""
              >
                {supervisors.map((supervisor, index) => {
                  return (
                    <MenuItem key={index} value={supervisor}>
                      {supervisor}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>

          <Button onClick={() => console.log(workerData)}>LOG</Button>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
