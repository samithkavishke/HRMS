import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Axios from "axios";
import { AppBar, Toolbar } from "@mui/material";

export default function ChangeNumOfLeaves() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/get_leave_days`, {})
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
    Axios.post("http://localhost:3001/change_leave_days", {
      pay_grade: updatedRows[index].pay_grade,
      gender: updatedRows[index].gender,
      Annual_leave: updatedRows[index].Annual_leave,
      Maternal_leave: updatedRows[index].Maternal_leave,
      Casual_leave: updatedRows[index].Casual_leave,
      no_pay_leave: updatedRows[index].no_pay_leave,
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
    Axios.post("http://localhost:3001/add_leave_days", {
      pay_grade: data.get("pay_grade"),
      gender: data.get("gender"),
      Annual_leave: data.get("Annual_leave"),
      Maternal_leave: data.get("Maternal_leave"),
      Casual_leave: data.get("Casual_leave"),
      no_pay_leave: data.get("no_pay_leave"),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ height: 480, width: "100%" }}>
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
          <TextField id="pay_grade" name="pay_grade" label="Pay Grade" />
          <TextField required id="gender" name="gender" label="Gender" />
          <TextField
            id="Annual_leave"
            name="Annual_leave"
            label="Annual Leave"
          />
          <TextField
            id="Maternal_leave"
            name="Maternal_leave"
            label="Maternal Leave"
          />
          <TextField
            id="Casual_leave"
            name="Casual_leave"
            label="Casual Leave"
          />
          <TextField
            id="no_pay_leave"
            name="no_pay_leave"
            label="No Pay Leave"
          />
          <Button variant="contained" type="submit">
            Add New Entry
          </Button>
        </Box>
      </div>
    </div>
  );
}

const columns = [
  {
    field: "pay_grade",
    headerName: "Pay Grade",
    width: 180,
    editable: false,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 180,
    editable: true,
  },
  {
    field: "Annual_leave",
    headerName: "Annual Leave",
    width: 180,
    editable: true,
  },
  {
    field: "Maternal_leave",
    headerName: "Maternal Leave",
    width: 180,
    editable: true,
  },
  {
    field: "Casual_leave",
    headerName: "Casual Leave",
    width: 180,
    editable: true,
  },
  {
    field: "no_pay_leave",
    headerName: "No Pay Leave",
    width: 180,
    editable: true,
  },
];
