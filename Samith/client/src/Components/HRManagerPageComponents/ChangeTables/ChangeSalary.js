import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { MenuItem, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Axios from "axios";
import { AppBar, Toolbar } from "@mui/material";

export default function ChangeSalary() {
  const [rows, setRows] = useState([]);
  const [new_job_title, setNewJobTitle] = useState("");
  const [new_pay_grade, setPayGrade] = useState("");
  const [new_salary, setSalary] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:3001/get_salaries`, {})
      .then((response) => {
        const fetchedrows = response.data.result;
        for (let i = 0; i < response.data.result.length; i++) {
          fetchedrows[i].id = i + 1;
        }
        setRows(fetchedrows);
        console.log(fetchedrows);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleRowEditCommit = (params) => {
    console.log("hi");
    const id = params.id;
    const key = params.field;
    const value = params.value;
    console.log(params.id);

    // Find the index of the row that was edited
    const index = rows.findIndex((row) => row.id === id);
    const pre_pay_grade = rows[index].pay_grade;
    const pre_job_title = rows[index].job_title;

    // Create a new copy of the rows array
    const updatedRows = [...rows];

    // Update the value of the edited cell in the new rows array
    updatedRows[index] = {
      ...updatedRows[index],
      [key]: value,
    };
    // Update the rows state with the new rows array
    setRows(updatedRows);
    console.log(updatedRows[index]);
    Axios.post("http://localhost:3001/Change_Salary", {
      pay_grade: updatedRows[index].pay_grade,
      job_title: updatedRows[index].job_title,
      salary: updatedRows[index].salary,
      pre_pay_grade: pre_pay_grade,
      pre_job_title: pre_job_title,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmit = (event) => {
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log(data.get("username"));
    Axios.post("http://localhost:3001/AddSalaryEntry", {
      pay_grade: data.get("new_pay_grade"),
      job_title: data.get("new_job_title"),
      salary: data.get("new_salary"),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ height: 520, width: "100%" }}>
      <br></br>
      <br></br>
      <br></br>
      <DataGrid
        editMode="cell"
        rows={rows}
        columns={columns}
        onCellEditCommit={handleRowEditCommit}
      />
      <div>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            id="new_pay_grade"
            name="new_pay_grade"
            label="Pay Grade"
          />
          <TextField
            required
            id="new_job_title"
            name="new_job_title"
            label="Job Title"
          />
          <TextField
            id="new_salary"
            name="new_salary"
            label="New Salary"
          />
          <Button variant="contained" type="submit">
            {" "}
            Add New Entry
          </Button>
        </Box>
      </div>
      <AppBar position="relative" color='primary'>
        <Toolbar>
          <Button href="http://localhost:3000/Home" variant='contained' color='info'>Home</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const columns = [
  { field: "pay_grade", headerName: "Pay Grade", width: 180, editable: false },
  { field: "job_title", headerName: "Job Title", width: 180, editable: false },
  {
    field: "salary",
    headerName: "Salary",
    width: 180,
    type: "number",
    editable: true,
  },
];
