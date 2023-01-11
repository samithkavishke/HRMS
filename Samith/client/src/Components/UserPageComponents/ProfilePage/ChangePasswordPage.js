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
// import { Navigate, useNavigate } from "react-router-dom";
// import { LoginContext, UserContext } from "../../Helper/UserContext";
import { useContext, useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import { LoginContext, UserContext } from "../../../Helper/UserContext";

const theme = createTheme();
//Login start

export default function ChangePassword(props) {
  const { cookies } = useContext(LoginContext);
  const employee_id = cookies.emp_id;
  const [mismatch, setMismatch] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(data.get("password"));
    console.log(data.get("confirm_password"));
    if (data.get("password") == data.get("confirm_password")) {
      setMismatch(false);

      Axios.post("http://localhost:3001/change_password", {
        employee_id: employee_id,
        password: data.get("password"),
      })
        .then((response) => {
          console.log(response);
          if (response.data.success) {
          }
        })
        .catch((e) => {
          console.log(e);
        });
      props.updateView(true);
    } else {
      setMismatch(true);
    }
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              type="password"
              name="password"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirm_password"
              label="Confirm Password"
              type="password"
              id="confirm_password"
            />
            {mismatch && (
              <Typography component="h5" variant="body">
                {" "}
                Password Mismatch{" "}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Change Password
            </Button>
            <Button
              onClick={() => {
                props.updateView(true);
              }}
            >
              {" "}
              Move to Profile
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
