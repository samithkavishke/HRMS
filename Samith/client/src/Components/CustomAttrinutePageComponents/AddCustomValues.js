import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";

import Axios from "axios";

import { AppBar, Toolbar } from "@mui/material";

export default function EditCustomDetails() {
  const [columns, setColumns] = useState([]);
  const [column, setColumn] = useState("");

  const [employee_id, setEmployerID] = useState("");
  const [customColumnValue, setCustomColumnValue] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:3001/get_custom_columns`, {})
      .then((response) => {
        if (response.data.result === undefined) {
          setColumns([]);
        } else {
          setColumns(response.data.result);
        }
        console.log(columns);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const search = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  const SubmitChanges = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    Axios.post("http://localhost:3001/add_details", {
      column: column,
      value: data.get("custom_attribute"),
      employee_id: data.get("employee_id"),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <Box justifyItems={"center"}>
        <Box
          sx={{
            alignItems: "center",
          }}
        >
          <Box noValidate sx={{ mt: 1 }}>
            <FormControl sx={{ m: 2, minWidth: 200, marginLeft: 5 }}>
              <TextField
                id="column-select"
                value={column}
                onChange={(e) => {
                  setColumn(e.target.value);
                }}
                label="Column Name"
                select
              >
                <MenuItem value="None"></MenuItem>
                <em>None</em>
                {columns.map((column_name, index) => {
                  return (
                    <MenuItem key={index} value={column_name}>
                      {column_name}
                    </MenuItem>
                  );
                })}
              </TextField>
            </FormControl>
          </Box>
          <Box
            component="form"
            onSubmit={SubmitChanges}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              marginTop={2}
            >
              <Grid item xs={6}>
                <Paper elevation={0}>
                  <Typography align="center">Employee's ID</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="employee_id"
                  label="Employee ID"
                  name="employee_id"
                  autoComplete="employee_id"
                  autoFocus
                ></TextField>
              </Grid>

              <Grid item xs={6}>
                <Paper elevation={0}>
                  <Typography align="center">{column}</Typography>
                </Paper>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="custom_attribute"
                  label="Custom Column Value"
                  name="custom_attribute"
                  autoComplete="custom_attribute"
                  autoFocus
                ></TextField>
              </Grid>
              <Grid justifyItems={"center"}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Save Changes
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
