import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Chip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, Link, useNavigate } from "react-router-dom";

// const cards = [1, 3];

const theme = createTheme();

export default function Welcome() {
  const navigate = useNavigate();

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
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h1"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Jupiter Human Resource Manager
            </Typography>
            <Typography
              variant="h3"
              align="center"
              color="text.primary"
              paragraph
            >
              Manage your company's most important resource here...
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={18}
              justifyContent="center"
            >
              <div>
                <Button
                  onClick={() => {
                    navigate("/Signup");
                  }}
                  variant="contained"
                  size="large"
                >
                  Start your HR journey here
                </Button>
                {/* <Link to="/Signup">
                  <Button variant="contained" size="large">
                    Start your HR journey here
                  </Button>
                </Link>{" "} */}
                {/* asd*/}
              </div>
              <div>
                {/* <Link to="/SignIn"> */}
                <Button
                  onClick={() => {
                    navigate("/SignIn");
                  }}
                  variant="outlined"
                  size="large"
                >
                  Login to existing company
                </Button>
                {/* </Link> */}
              </div>
            </Stack>
          </Container>
        </Box>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Designed by Jupiter Apparel Company IT Division
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {/* Something here to give the footer a purpose! */}
        </Typography>
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
