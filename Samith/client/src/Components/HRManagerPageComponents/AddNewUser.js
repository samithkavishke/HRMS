import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Axios from "axios";

const theme = createTheme();

export default function AddNewUser() {
  const usertypes = ["Level 1", "Level 2"];

  const [userType, setUserType] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("new_password") === data.get("confirm_password")) {
      setErrorMessage(false);
      Axios.post("http://localhost:3001/AddNewUser", {
        employee_id: data.get("employee_id"),
        username: data.get("username"),
        password: data.get("new_password"),
        user_type: userType,
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
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add New USer
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="employee_id"
                  label="Employee ID"
                  name="employee_id"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="branch_code"
                  required
                  fullWidth
                  id="branch_code"
                  label="Branch Code"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="UserName"
                  autoFocus
                  
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl sx={{ m: 2, minWidth: 200, marginLeft: 5 }}>
                  <TextField
                    id="usertype-select"
                    value={userType}
                    onChange={(e) => {
                      setUserType(e.target.value);
                    }}
                    label="User Type"
                    select
                  >
                    <MenuItem value="None">
                      <em>None</em>
                    </MenuItem>
                    {usertypes.map((type) => {
                      return <MenuItem value={type}>{type}</MenuItem>;
                    })}
                    {/* <MenuItem value={"finance"}>Finance</MenuItem>
                    <MenuItem value={"manufacturing"}>Manufacturing</MenuItem>
                    <MenuItem value={"IT"}>IT</MenuItem> */}
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
                  //   autoComplete="new-password"
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
                  //   autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                {/* <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                /> */}
              </Grid>
            </Grid>
            {errorMessage && (
              <Typography value="Password didn't match"></Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
