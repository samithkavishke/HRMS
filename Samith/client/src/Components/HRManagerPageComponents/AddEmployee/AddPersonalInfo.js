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

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const theme = createTheme();

const AddPersonalInfo = ({ personalData, setPersonalData }) => {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box noValidate sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="first_name"
                  label="First Name"
                  id="first_name"
                  defaultValue={personalData.first_name}
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      first_name: e.target.value,
                    })
                  }
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="last_name"
                  required
                  fullWidth
                  id="last_name"
                  label="Last Name"
                  defaultValue={personalData.last_name}
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      last_name: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address_line_1"
                  label="Address Line 1"
                  defaultValue={personalData.address_line_1}
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      address_line_1: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address_line_2"
                  label="Address Line 2"
                  name="address_line_2"
                  defaultValue={personalData.address_line_2}
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      address_line_2: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="town"
                  label="Town"
                  name="town"
                  defaultValue={personalData.town}
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      town: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format
                    label="BirthDate"
                    value={personalData.birthdate}
                    onChange={(newValue) => {
                      setPersonalData({
                        ...personalData,
                        birthdate: newValue,
                      });
                    }}
                    renderInput={(params) => <TextField {...params} />}
                    defaultValue={personalData.birthdate}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id="marital_status" defaultValue={""}>
                    Martial Status
                  </InputLabel>
                  <Select
                    id="marital_status"
                    value={personalData.marital_status}
                    label="Martial Status"
                    onChange={(e) => {
                      setPersonalData({
                        ...personalData,
                        marital_status: e.target.value,
                      });
                    }}
                    defaultValue=""
                  >
                    <MenuItem value={"single"}>Single</MenuItem>
                    <MenuItem value={"married"}>Married</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id="gender" defaultValue={""}>
                    Gender
                  </InputLabel>
                  <Select
                    id="gender"
                    value={personalData.gender}
                    label="Gender"
                    onChange={(e) => {
                      setPersonalData({
                        ...personalData,
                        gender: e.target.value,
                      });
                    }}
                    defaultValue=""
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {/* <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="marital_status"
                  label="Marital Status"
                  name="marital_status"
                  defaultValue={personalData.marital_status}
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      marital_status: e.target.value,
                    })
                  }
                />
              </Grid> */}
              {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="gender"
                  label="Gender"
                  id="gender"
                  defaultValue={personalData.gender}
                  onChange={(e) =>
                    setPersonalData({
                      ...personalData,
                      gender: e.target.value,
                    })
                  }
                />
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddPersonalInfo;
