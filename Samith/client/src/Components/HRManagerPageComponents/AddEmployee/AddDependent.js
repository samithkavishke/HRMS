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
import { AppBar, Toolbar } from "@mui/material";

const theme = createTheme();

export default function AddDependent({ dependantData, setDependantData }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="dependent_id"
          label="Enter Dependent ID number"
          id="dependent_id"
          defaultValue={dependantData.dependant_id}
          onChange={(e) =>
            setDependantData({
              ...dependantData,
              dependant_id: e.target.value,
            })
          }
          autoFocus
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="dependent_first_name"
          required
          fullWidth
          id="dependent_first_name"
          label="Dependent's First Name"
          defaultValue={dependantData.dependant_first_name}
          onChange={(e) =>
            setDependantData({
              ...dependantData,
              dependant_first_name: e.target.value,
            })
          }
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="dependent_last_name"
          label="Dependent's Last Name"
          name="dependent_last_name"
          defaultValue={dependantData.dependant_last_name}
          onChange={(e) =>
            setDependantData({
              ...dependantData,
              dependant_last_name: e.target.value,
            })
          }
        />
      </Grid>
    </Grid>
  );
}
