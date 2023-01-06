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

const theme = createTheme();

export default function AddDependent() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    Axios.post("http://localhost:3001/AddDependent", {
      employee_id:"10001",
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h2" align="center">
            Add Employee's Dependent Information
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="dependent_id"
                  label="Enter Dependent ID number"
                  id="dependent_id"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="dependent_first_name"
                  required
                  fullWidth
                  id="dependent_first_name"
                  label="Dependent's First Name"
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
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ADD DEPENDENT INFO
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
