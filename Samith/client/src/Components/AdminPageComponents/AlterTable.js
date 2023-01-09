import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import { MenuItem, Typography } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { useState, useEffect } from "react";
import Axios from "axios";
import axios from "axios";
import { useRef } from "react";
import { AppBar, Toolbar } from "@mui/material";

// ...

export default function ChangeTable() {
  const currentColumnsRef = useRef();
  const [tables, setTables] = useState([]);
  const [table, setTable] = useState("None");
  const [currentColumns, setCurrentColumns] = useState([]);
  const [datatype, setDataType] = useState("None");

  const dataTypes = [
    { name: "None", val: "None" },
    { name: "SHORT TEXT", val: "VARCHAR(5)" },
    { name: "LONG TEXT", val: "VARCHAR(20)" },
    { name: "INTEGER", val: "INT(20)" },
    { name: "FIXED SHORT TEXT", val: "CHAR(5)" },
    { name: "FIXED LONG TEXT", val: "CHAR(15)" },
  ];

  useEffect(() => {
    Axios.get(`http://localhost:3001/show_tables`, {})
      .then((response) => {
        console.log(response.data.result);
        setTables(response.data.result);
        console.log(tables);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (table !== "None") {
        console.log(table);
        const response = await Axios.get(`http://localhost:3001/show_columns`, {
          params: {
            table: table,
          },
        });
        console.log(response.data.result, "hi");
        setCurrentColumns((prevColumns) => response.data.result);
        currentColumnsRef.current = currentColumns;
        console.log(currentColumnsRef.current);
        // console.log((currentColumns) => currentColumns());
      }
    }
    fetchData();
  }, [table]);

  // useEffect(() => {
  //   if (table != "None") {
  //     console.log(table);
  //     Axios.get(`http://localhost:3001/show_columns`, {
  //       params: {
  //         table: table,
  //       },
  //     })
  //       .then((response) => {
  //         console.log(response.data.result);
  //         console.log(currentColumns);
  //         setCurrentColumns(response.data.result);
  //         console.log(currentColumns);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }
  // }, [table]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    Axios.post("http://localhost:3001/Alter_Table", {
      table: table,
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
        <AppBar position="relative" color='primary'>
          <Toolbar>
            <Button href="http://localhost:3000/Home" variant='contained' color='info'>Home</Button>
          </Toolbar>
        </AppBar>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <FormControl sx={{ m: 2, minWidth: 200, marginLeft: 5 }}>
            <TextField
              id="table-select"
              value={table}
              onChange={(e) => {
                setTable(e.target.value);
              }}
              label="Table Name"
              select
            >
              <MenuItem value="None"></MenuItem>
              <em>None</em>
              {tables.map((table_name, index) => {
                return (
                  <MenuItem key={index} value={table_name}>
                    {table_name}
                  </MenuItem>
                );
              })}
            </TextField>
          </FormControl>
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
