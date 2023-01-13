import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Axios from "axios";

const theme = createTheme();

export default function AddNewUser() {
  const usertypes = ["user", "hrm", "admin", "supervisor"];

  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("employee_id"));
    if (data.get("new_password") === data.get("confirm_password")) {
      setErrorMessage(false);
      Axios.post("http://localhost:3001/AddNewUser", {
        employee_id: data.get("employee_id"),
        username: data.get("username"),
        password: data.get("new_password"),
        user_type: data.get("user-type"),
        branch_code: data.get("branch_code"),
      })
        .then((response) => {
          console.log(response);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setErrorMessage(true);
    }
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" sx={{ marginTop: 6 }}>
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
            Add New User
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  label="Employee ID"
                  name="employee_id"
                  id="employee_id"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  required
                  fullWidth
                  label="Branch Code"
                  name="branch_code"
                  id="branch_code"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  label="UserName"
                  name="username"
                  id="username"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <TextField
                    id="usertype-select"
                    label="User Type"
                    name="user-type"
                    select
                  >
                    {usertypes.map((type) => {
                      return <MenuItem value={type}>{type}</MenuItem>;
                    })}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="new_password"
                  label="Password"
                  type="password"
                  id="new_password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Save User
                </Button>
              </Grid>
            </Grid>
            {errorMessage && (
              <Typography value="Password didn't match"></Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
