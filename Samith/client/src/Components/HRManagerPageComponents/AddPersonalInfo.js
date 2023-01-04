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

const theme = createTheme();

const AddPersonalInfo = () => {
  const [birthdate, setBirthDate] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    Axios.post("http://localhost:3001/AddPersonalInfo", {
      username: data.get("username"),
      password: data.get("password"),
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
        {/* <CssBaseline /> */}
        {/* <div style={{ overflow: "scroll" }}> */}
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
            <Grid container spacing={1}>
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
                    id="contact_number"
                    label="Contact Number"
                    name="contact_number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="emergency_name"
                    label="Emergency Contact Name"
                    id="emergency_name"
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
            </Grid>
          </Box>
        </Box>
        {/* </div> */}
      </Container>
    </ThemeProvider>
  );
};

export default AddPersonalInfo;
