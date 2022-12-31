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
import { Navigate, useNavigate } from "react-router-dom";
import { LoginContext } from "../../Helper/UserContext";
import { useContext } from "react";

const theme = createTheme();

export default function SignIn() {
  const { loggedIn, setLoggedIn } = useContext(LoginContext);

  let navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("username"));
    Axios.post("http://localhost:3001/login", {
      username: data.get("username"),
      password: data.get("password"),
    })
      .then((response) => {
        // console.log(response);
        if (response.data.success) {
          setLoggedIn(true);
          console.log("hehe");
          // navigate("/Home");
          return <Navigate to="/Home" />;
          // window.location = "/Home";
          // navigate( {pathname:"/", state:{authorized: true, username: data.get("username")}});
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(loggedIn);
  if (loggedIn) {
    // console.log(loggedIn);
    return <Navigate to="./Home" />;

    // return redirect("/");
  }
  // console.log(loggedIn);
  // useEffect(() => {
  //   return () => {
  //     if (loggedIn) {
  //       console.log(loggedIn);
  //       return navigate("/Home");

  //       // return redirect("/");
  //     }
  //   };
  // });
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
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
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
