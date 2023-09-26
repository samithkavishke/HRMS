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

export default function ChangeDependents() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/get_dependents`, {})
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
    Axios.post("http://localhost:3001/change_dependents", {
      dependent_id: updatedRows[index].branch_code,
      employee_id: updatedRows[index].employee_id,
      first_name: updatedRows[index].first_name,
      last_name: updatedRows[index].last_name,
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
    Axios.post("http://localhost:3001/add_dependent", {
      dependent_id: data.get("new_dependent_id"),
      employee_id: data.get("new_employee_id"),
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        editMode="cell"
        rows={rows}
        columns={columns}
        onCellEditCommit={handleRowEditCommit}
      />
      <div>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            id="new_dependent_id"
            name="new_dependent_id"
            label="Dependent ID"
          />
          <TextField
            required
            id="new_employee_id"
            name="new_employee_id"
            label="Employee ID"
          />
          <TextField
            required
            id="first_name"
            name="first_name"
            label="First Name"
          />
          <TextField
            required
            id="last_name"
            name="last_name"
            label="Last Name"
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
  {
    field: "dependent_id",
    headerName: "Dependent ID",
    width: 180,
    editable: false,
  },
  {
    field: "employee_id",
    headerName: "Employee ID",
    width: 180,
    editable: true,
  },
  {
    field: "first_name",
    headerName: "First Name",
    width: 180,
    editable: true,
  },
  {
    field: "last_name",
    headerName: "Last Name",
    width: 180,
    editable: true,
  },

];
