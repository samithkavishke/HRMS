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

export default function AddEmergencyInfo({ emergencyData, setEmergencyData }) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="employee_contact"
          label="Employee's Contact Number"
          id="employee_contact"
          defaultValue={emergencyData.ec_emp_contact}
          onChange={(e) =>
            setEmergencyData({
              ...emergencyData,
              ec_emp_contact: e.target.value,
            })
          }
          autoFocus
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          name="contact_first_name"
          required
          fullWidth
          id="contact_first_name"
          label="First Name"
          defaultValue={emergencyData.ec_first_name}
          onChange={(e) =>
            setEmergencyData({
              ...emergencyData,
              ec_first_name: e.target.value,
            })
          }
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="contact_last_name"
          label="Contact Last Name"
          name="contact_last_name"
          defaultValue={emergencyData.ec_last_name}
          onChange={(e) =>
            setEmergencyData({
              ...emergencyData,
              ec_last_name: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="contact_phone_number"
          label="Contact Number"
          id="contact_phone_number"
          autoComplete="contact_phone_number"
          defaultValue={emergencyData.ec_phone_number}
          onChange={(e) =>
            setEmergencyData({
              ...emergencyData,
              ec_phone_number: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          name="contract_relation"
          label="Relation"
          id="contract_relation"
          autoComplete="contract_relation"
          defaultValue={emergencyData.ec_relation}
          onChange={(e) =>
            setEmergencyData({
              ...emergencyData,
              ec_relation: e.target.value,
            })
          }
        />
      </Grid>
    </Grid>
  );
}
