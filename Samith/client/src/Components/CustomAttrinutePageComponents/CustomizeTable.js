import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";
import Axios from "axios";
import { AppBar, Toolbar } from "@mui/material";

export default function CustomizeTable() {
  const [datatype, setDataType] = useState("None");

  const dataTypes = [
    { name: "None", val: "None" },
    { name: "SHORT TEXT", val: "VARCHAR(5)" },
    { name: "LONG TEXT", val: "VARCHAR(20)" },
    { name: "INTEGER", val: "INT(20)" },
    { name: "FIXED SHORT TEXT", val: "CHAR(5)" },
    { name: "FIXED LONG TEXT", val: "CHAR(15)" },
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
        <br></br>
        <br></br>
        <br></br>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FormControl sx={{ m: 2, minWidth: 200 }}>
            <TextField
              required
              fullWidth
              id="new_column_name"
              label="New Column Name"
              name="new_column_name"
              autoFocus
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
          <Button
            variant="contained"
            type="submit"
            sx={{ m: 2, maxWidth: 150 }}
          >
            Add New Field
          </Button>
        </Box>
      </div>
    </Container>
  );
}
