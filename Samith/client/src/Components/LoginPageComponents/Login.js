import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Axios from "axios";
import { Navigate } from "react-router-dom";
import { LoginContext, UserContext } from "../../Helper/UserContext";
import { useContext, useState } from "react";
import { AppBar, Toolbar, Alert } from "@mui/material";

const theme = createTheme();

export default function SignIn() {
  const { setLoggedIn, setCookie } = useContext(LoginContext);
  const { setUser, setInfo } = useContext(UserContext);
  const [alert, setAlert] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("username"));
    Axios.post("http://localhost:3001/login", {
      username: data.get("username"),
      password: data.get("password"),
    })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          console.log(response.data.info);
          setLoggedIn(true);
          setUser(response.data.info.user_type);
          setInfo([response.data.info.emp_id, response.data.info.supervisors]);
          setCookie("user_type", response.data.info.user_type, { path: "/" });
          setCookie("emp_id", response.data.info.emp_id, { path: "/" });
          setCookie("depends", response.data.info.supervisors, { path: "/" });

          return <Navigate to="/Home" />;
        } else {
          console.log(response.data);
          setAlert("Error logging in");
        }
      })
      .catch((e) => {
        setAlert("Error logging in");
        console.log(e);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative" color="primary">
        <Toolbar>
          <Button
            href="http://localhost:3000/"
            variant="contained"
            color="info"
          >
            Jupiter Human Resource Manager
          </Button>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {alert && <Alert severity="error">{alert}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
