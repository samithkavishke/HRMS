import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useState, useEffect } from "react";
import Axios from "axios";
import { AppBar, Toolbar } from "@mui/material";

export default function Reports() {
  const [rows, setRows] = useState([]);
  const [department, setDepartment] = useState("None");
  const [payGrade, setPayGrade] = useState("None");
  const [jobTitle, setJobTitle] = useState("None");
  const [customField, setCustomField] = useState("None");
  const [customAttribute, setCustomAttribute] = useState("None");

  const [fields, setFields] = useState([]);
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/get_custom_columns`)
      .then((response) => {
        setFields(response.data.result);
        console.log(fields);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (customField !== "None") {
      Axios.get(`http://localhost:3001/get_custom_attributes`, {
        params: { field: customField },
      })
        .then((response) => {
          setAttributes(response.data.result);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setAttributes([]);
    }
  }, [customField]);

  useEffect(() => {
    console.log("customAttribute :", customAttribute);
    Axios.get(`http://localhost:3001/filter`, {
      params: {
        department: department,
        payGrade: payGrade,
        jobTitle: jobTitle,
        field: customField,
        attribute: customAttribute,
      },
    })
      .then((response) => {
        setRows(response.data.result);
        console.log(rows);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [department, payGrade, jobTitle, customAttribute]);

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handlePayGradeChange = (event) => {
    setPayGrade(event.target.value);
  };

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  };

  const handleCustomFieldChange = (event) => {
    setCustomField(event.target.value);
  };

  const handleCustomAttributeChange = (event) => {
    setCustomAttribute(event.target.value);
  };

  return (
    <div>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <Button
            href="http://localhost:3000/Home"
            variant="contained"
            color="info"
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <div>
          <Box>
            <FormControl sx={{ m: 2, minWidth: 150, marginLeft: 5 }}>
              <TextField
                id="department-select"
                value={department}
                onChange={handleDepartmentChange}
                label="Department Name"
                select
              >
                <MenuItem value="None">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"finance"}>Finance</MenuItem>
                <MenuItem value={"human resource"}>Human Resource</MenuItem>
                <MenuItem value={"IT"}>IT</MenuItem>
                <MenuItem value={"manufacturing"}>Manufacturing</MenuItem>
                <MenuItem value={"research and development"}>
                  Research & Development
                </MenuItem>
                <MenuItem value={"sales"}>Sales</MenuItem>
              </TextField>
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 150 }}>
              <TextField
                id="pay-grade-select"
                value={payGrade}
                onChange={handlePayGradeChange}
                label="Pay Grade"
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
            <FormControl sx={{ m: 2, minWidth: 150 }}>
              <TextField
                id="job-title-select"
                value={jobTitle}
                onChange={handleJobTitleChange}
                label="Job Title"
                select
              >
                <MenuItem value="None">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"accountant"}>Accountant</MenuItem>
                <MenuItem value={"clerk"}>Clerk</MenuItem>
                <MenuItem value={"designer"}>Designer</MenuItem>
                <MenuItem value={"engineer"}>Engineer</MenuItem>
                <MenuItem value={"factory staff"}>Factory Staff</MenuItem>
                <MenuItem value={"manager"}>Manager</MenuItem>
                <MenuItem value={"receptionist"}>Receptionist</MenuItem>
                <MenuItem value={"supervisor"}>Supervisor</MenuItem>
              </TextField>
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 150 }}>
              <TextField
                id="custom-field-select"
                value={customField}
                onChange={handleCustomFieldChange}
                label="Custom Field"
                select
              >
                <MenuItem value="None">
                  <em>None</em>
                </MenuItem>

                {fields.map((field_name, index) => {
                  return (
                    <MenuItem key={index} value={field_name}>
                      {field_name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </FormControl>
            <FormControl sx={{ m: 2, minWidth: 150 }}>
              <TextField
                id="custom-field-select"
                value={customAttribute}
                onChange={handleCustomAttributeChange}
                label="Custom Attribute"
                select
              >
                <MenuItem value="None">
                  <em>None</em>
                </MenuItem>

                {attributes.map((field_name, index) => {
                  return (
                    <MenuItem key={index} value={field_name}>
                      {field_name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </FormControl>
          </Box>
        </div>

        <Box margin={5} marginTop={5}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Employee ID</TableCell>
                  <TableCell align="right">Job Title</TableCell>
                  <TableCell align="right">Pay Grade</TableCell>
                  <TableCell align="right">Employee Status</TableCell>
                  <TableCell align="right">Contract Period</TableCell>
                  <TableCell align="right">Department</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {useEffect(() => { */}
                {rows.map((row) => (
                  <TableRow
                    key={row.employee_id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.employee_id}
                    </TableCell>
                    <TableCell align="right">{row.job_title}</TableCell>
                    <TableCell align="right">{row.pay_grade}</TableCell>
                    <TableCell align="right">{row.employee_status}</TableCell>
                    <TableCell align="right">{row.contract_period}</TableCell>
                    <TableCell align="right">{row.department}</TableCell>
                  </TableRow>
                ))}
                {/* })} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </div>
  );
}
