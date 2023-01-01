import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useState } from "react";
import Axios from "axios";
import { FormControlUnstyledContext } from "@mui/base";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
let rows = [];
// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

export default function Reports() {
  const [department, setDepartment] = useState("None");
  const [payGrade, setPayGrade] = useState("None");
  const [jobTitle, setJobTitle] = useState("None");
  // ${department}-${payGrade}-${jobTitle}
  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
    Axios.get(
      `http://localhost:3001/filter/${department}-${payGrade}-${jobTitle}`
    )
      .then((response) => {
        rows = response.data.result;
        console.log(rows);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handlePayGradeChange = (event) => {
    setPayGrade(event.target.value);
    Axios.get(
      `http://localhost:3001/filter/${department}-${payGrade}-${jobTitle}`
    )
      .then((response) => {
        rows = response.data.result;
        // console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
    Axios.get(
      `http://localhost:3001/filter/${department}-${payGrade}-${jobTitle}`
    )
      .then((response) => {
        rows = response.data.result;
        console.log(rows);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <div>
        <FormControl sx={{ m: 2, minWidth: 200, marginLeft: 5 }}>
          <TextField
            id="department-select"
            value={department}
            label="Department Name"
            onChange={handleDepartmentChange}
            select
          >
            <MenuItem value="None">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"finance"}>Finance</MenuItem>
            <MenuItem value={"manufacturing"}>Manufacturing</MenuItem>
            <MenuItem value={"IT"}>IT</MenuItem>
          </TextField>
        </FormControl>
        <FormControl sx={{ m: 2, minWidth: 200 }}>
          <TextField
            id="pay-grade-select"
            value={payGrade}
            label="Pay Grade"
            onChange={handlePayGradeChange}
            select
          >
            <MenuItem value="None">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"Level 1"}>Level 1</MenuItem>
            <MenuItem value={"Level 2"}>Level 2</MenuItem>
            <MenuItem value={"Level 3"}>Level 3</MenuItem>
          </TextField>
        </FormControl>
        <FormControl sx={{ m: 2, minWidth: 200 }}>
          <TextField
            id="job-title-select"
            value={jobTitle}
            label="Job Title"
            onChange={handleJobTitleChange}
            select
          >
            <MenuItem value="None">
              <em>None</em>
            </MenuItem>
            <MenuItem value={"accountant"}>Accountant</MenuItem>
            <MenuItem value={"manager"}>Manager</MenuItem>
            <MenuItem value={"designer"}>Designer</MenuItem>
            <MenuItem value={"engineer"}>Engineer</MenuItem>
          </TextField>
        </FormControl>
      </div>

      <Box margin={5} marginTop={5}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell align="right">First Name</TableCell>
                <TableCell align="right">Last Name</TableCell>
                <TableCell align="right">Address</TableCell>
                <TableCell align="right">Birth Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.employee_id}
                  </TableCell>
                  <TableCell align="right">{row.job_title}</TableCell>
                  <TableCell align="right">{row.pay_grade}</TableCell>
                  <TableCell align="right">{row.employee_status}</TableCell>
                  <TableCell align="right">{row.contract_period}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
