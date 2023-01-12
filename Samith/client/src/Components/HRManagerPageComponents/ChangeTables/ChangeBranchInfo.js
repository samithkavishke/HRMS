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

export default function ChangeBranchInfo() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/get_branch_info`, {})
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
    Axios.post("http://localhost:3001/change_branch_info", {
      branch_code: updatedRows[index].branch_code,
      branch_name: updatedRows[index].branch_name,
      address_line1: updatedRows[index].address_line1,
      address_line2: updatedRows[index].address_line2,
      town: updatedRows[index].town,
      reg_number: updatedRows[index].reg_number,
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
    Axios.post("http://localhost:3001/add_branch_entry", {
      branch_code: data.get("new_branch_code"),
      branch_name: data.get("new_branch_name"),
      address_line1: data.get("address_line1"),
      address_line2: data.get("address_line2"),
      town: data.get("town"),
      reg_number: data.get("reg_number"),
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
            id="new_branch_code"
            name="new_branch_code"
            label="Branch Code"
          />
          <TextField
            required
            id="new_branch_name"
            name="new_branch_name"
            label="Branch Name"
          />
          <TextField
            id="address_line1"
            name="address_line1"
            label="Address Line 1"
          />
          <TextField
            id="address_line2"
            name="address_line2"
            label="Address Line 2"
          />
          <TextField id="town" name="town" label="Town" />
          <TextField id="reg_number" name="reg_number" label="Reg Number" />
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
    field: "branch_code",
    headerName: "Branch Code",
    width: 180,
    editable: false,
  },
  {
    field: "branch_name",
    headerName: "Branch Name",
    width: 180,
    editable: true,
  },
  {
    field: "address_line1",
    headerName: "Address Line 1",
    width: 180,
    editable: true,
  },
  {
    field: "address_line2",
    headerName: "Address Line 2",
    width: 180,
    editable: true,
  },
  {
    field: "town",
    headerName: "Town",
    width: 180,
    editable: true,
  },
  {
    field: "reg_number",
    headerName: "Reg Number",
    width: 180,
    editable: true,
  },
];
