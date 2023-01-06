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

export default function AddEmergencyInfo() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    Axios.post("http://localhost:3001/AddEmergencyInfo", {
      employee_id:"10001",
      employee_contact: data.get("employee_contact"),
      contact_first_name: data.get("contact_first_name"),
      contact_last_name: data.get("contact_last_name"),
      contact_phone_number: data.get("contact_phone_number"),
      contract_relation: data.get("employee_contact"),
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
            Add Emergency Info
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
                  name="employee_contact"
                  label="Employee's Contact Number"
                  id="employee_contact"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="contact_first_name"
                  required
                  fullWidth
                  id="contact_first_name"
                  label="First Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="contact_last_name"
                  label="Contact Last Name"
                  name="contact_last_name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contact_phone_number"
                  label="Contact Number"
                  id="contact_phone_number"
                  autoComplete="contact_phone_number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contract_relation"
                  label="Relation"
                  id="contract_relation"
                  autoComplete="contract_relation"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ADD EMERGENCY INFO
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
