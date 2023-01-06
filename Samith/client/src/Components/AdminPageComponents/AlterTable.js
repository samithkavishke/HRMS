import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useState, useEffect } from "react";
import Axios from "axios";



export default function Reports() {
  const [rows, setRows] = useState([]);
  const [table, setTable] = useState("None");
  const [payGrade, setPayGrade] = useState("None");
  const [jobTitle, setJobTitle] = useState("None");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    Axios.post("http://localhost:3001/AddEmergencyInfo", {
      employee_id: "10001",
      employee_contact: data.get("employee_contact"),
      contact_first_name: data.get("contact_first_name"),
      contact_last_name: data.get("contact_last_name"),
      contact_phone_number: data.get("contact_phone_number"),
      contract_relation: data.get("employee_contact"),
      // password: data.get("password"),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handlePayGradeChange = (event) => {
    setPayGrade(event.target.value);
  };

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  };

  return (
    <Container>
      <div>
        <Box>
          <FormControl sx={{ m: 2, minWidth: 200, marginLeft: 5 }}>
            <TextField
              id="table-select"
              value={table}
              onChange={handleTableChange}
              label="Table Name"
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
          <FormControl sx={{ m: 2, minWidth: 200 }}>
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
              <MenuItem value={"manager"}>Manager</MenuItem>
              <MenuItem value={"designer"}>Designer</MenuItem>
              <MenuItem value={"engineer"}>Engineer</MenuItem>
            </TextField>
          </FormControl>
          <Button type="submit"> Click Here</Button>
        </Box>
      </div>
    </Container>
  );
}
