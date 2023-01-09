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
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";
import { AppBar, Toolbar } from "@mui/material";

const theme = createTheme();

const AddPersonalInfo = () => {
  const [birthdate, setBirthDate] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    Axios.post("http://localhost:3001/AddPersonalInfo", {
      employee_id: "10005",
      first_name: data.get("first_name"),
      last_name: data.get("last_name"),
      address_line_1: data.get("address_line_1"),
      address_line_2: data.get("address_line_2"),
      town: data.get("town"),
      contact_number: data.get("contact_number"),
      birthdate: birthdate,
      marital_status: data.get("marital_status"),
      gender: data.get("gender"),
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
      <Container component="main" maxWidth="sm" style={{ height: "100%" }}>
        <CssBaseline />
        <AppBar position="relative" color='primary'>
          <Toolbar>
            <Button href="http://localhost:3000/Home" variant='contained' color='info'>Home</Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h3" align="center">
            Add Personal Info
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="first_name"
                  label="First Name"
                  id="first_name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="last_name"
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address_line_1"
                  label="Address Line"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address_line_2"
                  label="Address Line 2"
                  name="address_line_2"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="town"
                  label="Town"
                  name="town"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format
                    label="BirthDate"
                    value={birthdate}
                    onChange={(newValue) => {
                      setBirthDate(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="marital_status"
                  label="Marital Status"
                  name="marital_status"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="gender"
                  label="Gender"
                  id="gender"
                />
              </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Add Details
              </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddPersonalInfo;
