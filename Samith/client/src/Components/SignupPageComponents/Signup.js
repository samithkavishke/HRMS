import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate } from "react-router-dom";
import Axios from "axios";
import { AppBar, Toolbar } from "@mui/material";
import Database from "./DatabaseDetails";

const theme = createTheme();
const passwordcheck = document.getElementById("password");
const passwordcheck2 = document.getElementById("password2");

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    Axios.post("http://localhost:3001/login", {
      username: data.get("username"),
      password: data.get("password"),
    })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          // setLoggedIn(true);
          // setCookie("token", response.data.token, { path: "/" });
          return <Navigate to="/DB-details" />;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative" color='primary'>
          <Toolbar>
            <Button href="http://localhost:3000/" variant='contained' color='info'>Jupiter Human Resource Manager</Button>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h2" align="center">
            Start your HR journey with Jupiter!
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
                  name="regnum"
                  label="Business Registration Number"
                  id="regnum"
                  autoComplete="regnum"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="companyname"
                  required
                  fullWidth
                  id="companyname"
                  label="Organization Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="mainaddress2"
                  label="Main Branch Address Line 2"
                  id="mainaddress2"
                  autoComplete="mainaddress2"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="mainaddress1"
                  label="Main Branch Address Line 1"
                  id="mainaddress1"
                  autoComplete="mainaddress1"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="town"
                  label="Main Branch Town"
                  id="town"
                  autoComplete="town"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm password"
                  type="password"
                  id="password2"
                  autoComplete="new-password2"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Next
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="http://localhost:3000/Signin" variant="body1">
                  Does your organization already have a Jupiter Database? Click
                  here!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
