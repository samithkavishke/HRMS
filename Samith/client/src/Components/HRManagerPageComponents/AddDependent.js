import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import { AppBar, Toolbar } from "@mui/material";

const theme = createTheme();

export default function AddDependent({ dependantData, setDependantData }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    Axios.post("http://localhost:3001/AddDependent", {
      employee_id: "10001",
      employee_contact: data.get("dependent_id"),
      contact_first_name: data.get("dependent_first_name"),
      contact_last_name: data.get("dependent_last_name"),
      // password: data.get("password"),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="dependent_id"
            label="Enter Dependent ID number"
            id="dependent_id"
            defaultValue={dependantData.employee_contact}
            onChange={(e) =>
              setDependantData({
                ...dependantData,
                employee_contact: e.target.value,
              })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="dependent_first_name"
            required
            fullWidth
            id="dependent_first_name"
            label="Dependent's First Name"
            defaultValue={dependantData.contact_first_name}
            onChange={(e) =>
              setDependantData({
                ...dependantData,
                contact_first_name: e.target.value,
              })
            }
            autoFocus
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="dependent_last_name"
            label="Dependent's Last Name"
            name="dependent_last_name"
            defaultValue={dependantData.contact_last_name}
            onChange={(e) =>
              setDependantData({
                ...dependantData,
                contact_last_name: e.target.value,
              })
            }
          />
        </Grid>
      </Grid>
      <Button onClick={() => console.log(dependantData)}>LOG</Button>
    </Box>
  );
}
