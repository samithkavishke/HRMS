import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import Axios from "axios";
import { useRef } from "react";
import { AppBar, Toolbar } from "@mui/material";

// ...

export default function CustomizeTable() {
  // //   const currentColumnsRef = useRef();
  //   const [tables, setTables] = useState([]);
  //   const [table, setTable] = useState("None");
  //   const [currentColumns, setCurrentColumns] = useState([]);
  const [datatype, setDataType] = useState("None");

  const dataTypes = [
    { name: "None", val: "None" },
    { name: "SHORT TEXT", val: "VARCHAR(5)" },
    { name: "LONG TEXT", val: "VARCHAR(20)" },
    { name: "INTEGER", val: "INT(20)" },
    { name: "FIEXED SHORT TEXT", val: "CHAR(5)" },
    { name: "FIEXED LONG TEXT", val: "CHAR(15)" },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    Axios.post("http://localhost:3001/add_custom_field", {
      column: data.get("new_column_name"),
      datatype: datatype,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <FormControl sx={{ m: 2, minWidth: 200 }}>
            <TextField
              required
              fullWidth
              id="new_column_name"
              label="New Column Name"
              name="new_column_name"
            />
          </FormControl>
          <FormControl sx={{ m: 2, minWidth: 200 }}>
            <TextField
              id="data-type-select"
              value={datatype}
              onChange={(e) => {
                setDataType(e.target.value);
              }}
              label="Data Type"
              select
            >
              {dataTypes.map((row, index) => {
                return (
                  <MenuItem key={index} value={row.val}>
                    {row.name}
                  </MenuItem>
                );
              })}
            </TextField>
          </FormControl>
          <Button variant="contained" type="submit">
            {" "}
            Add New Field
          </Button>
        </Box>
      </div>
    </Container>
  );
}
