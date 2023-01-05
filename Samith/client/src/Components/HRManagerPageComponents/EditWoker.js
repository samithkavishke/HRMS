import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Axios from "axios";
import { useRef, useEffect } from "react";
import Stack from "@mui/material/Stack";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function EditDetails() {
  const valuRef = useRef();

  const [employee_id, setEmployeeID] = useState("");
  const [entries, setEntries] = useState([]);

  const [job_title, setJobTitle] = useState("");
  const [pay_grade, setPayGrade] = useState("");
  const [employee_status, setEmployeeStatus] = useState("");
  const [contract_period, setConractPeriod] = useState("");
  const [department, setDepartment] = useState("");

  const [birth_dater, setBirthDateR] = useState(new Date());

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address_line1, setAddressLine1] = useState("");
  const [address_line2, setAddressLine2] = useState("");
  const [town, setTown] = useState("");
  const [marital_status, setMaritalStatus] = useState("");
  const [gender, setGender] = useState("");

  const [employee_contact, setEmployeeContact] = useState("");
  const [contact_first_name, setContactFirstName] = useState("");
  const [contact_last_name, setContactLastName] = useState("");
  const [contact_relation, setContactRelation] = useState("");
  const [contact_phone_number, setContactPhoneNumber] = useState("");

  // const [userWorkData, setUserWorkData] = useState({
  //   job_title: "",
  //   pay_grade: "",
  //   employee_status: "",
  //   contract_period: "",
  //   department: "",
  // });

  // const [userPersonalData, setUserPersonalData] = useState({
  //   first_name: "",
  //   last_name: "",
  //   address_line1: "",
  //   address_line2: "",
  //   town: "",
  //   birth_date: "",
  //   birth_month: "",
  //   birth_year: "",
  //   marital_status: "",
  //   gender: "",
  // });

  // const [userEmergencyData, setUserEmergencyData] = useState({
  //   employee_contact: "",
  //   contact_first_name: "",
  //   contact_last_name: "",
  //   contact_relation: "",
  //   contact_phone_number: "",
  // });

  const search = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setEmployeeID(data.get("employee_id"));
  };

  useEffect(() => {
    console.log("HELLO");
    Axios.get("http://localhost:3001/details-by-employee-id", {
      params: {
        employee_id: employee_id,
      },
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          console.log(response.data.result);

          const birthDateString =
            response.data.result[1]["birth_date"] +
            response.data.result[1]["birth_month"] +
            response.data.result[1]["birth_year"];

          const date = new Date(birthDateString);

          setJobTitle(response.data.result[0]["job_title"]);
          setPayGrade(response.data.result[0]["pay_grade"]);
          setEmployeeStatus(response.data.result[0]["employee_status"]);
          setConractPeriod(response.data.result[0]["contract_period"]);
          setDepartment(response.data.result[0]["department"]);

          setFirstName(response.data.result[1]["first_name"]);
          setLastName(response.data.result[1]["last_name"]);
          setAddressLine1(response.data.result[1]["address_line1"]);
          setAddressLine2(response.data.result[1]["address_line2"]);
          setTown(response.data.result[1]["town"]);
          setBirthDateR(date);
          setMaritalStatus(response.data.result[1]["marital_status"]);
          setGender(response.data.result[1]["gender"]);

          setEmployeeContact(response.data.result[2]["employee_contact"]);
          setContactFirstName(response.data.result[2]["contact_first_name"]);
          setContactLastName(response.data.result[2]["contact_last_name"]);
          setContactRelation(response.data.result[2]["contact_relation"]);
          setContactPhoneNumber(
            response.data.result[2]["contact_phone_number"]
          );
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, [employee_id]);

  const SubmitChanges = (event) => {
    event.preventDefault();
    const birth = birth_dater;
    console.log(birth);
    if (!birth) {
      return;
    }
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const emergencyData = {
      employee_id: employee_id,
      employee_contact: employee_contact,
      contact_first_name: contact_first_name,
      contact_last_name: contact_last_name,
      contact_relation: contact_relation,
      contact_phone_number: contact_phone_number,
    };

    const personalData = {
      employee_id: employee_id,
      first_name: first_name,
      last_name: last_name,
      address_line1: address_line1,
      address_line2: address_line2,
      town: town,
      birth_date: birth.$D,
      birth_month: monthNames[birth.$M],
      birth_year: birth.$y,
      marital_status: marital_status,
      gender: gender,
    };
    const workData = {
      employee_id: employee_id,
      job_title: job_title,
      pay_grade: pay_grade,
      contract_period: contract_period,
      employee_status: employee_status,
      department: department,
    };

    Axios.post("http://localhost:3001/submit-changes", {
      workData: workData,
      personalData: personalData,
      emergencyData: emergencyData,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Box justifyItems={"center"}>
      <Box
        sx={{
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={search} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="employee_id"
            label="Employee ID"
            name="employee_id"
            autoComplete="employee_id"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Search
          </Button>
        </Box>
        <Box
          component="form"
          onSubmit={SubmitChanges}
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            marginTop={2}
          >
            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Employee's ID</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField disabled value={employee_id}>
                {" "}
                baba
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Job Title</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setJobTitle(e.target.value);
                }}
                value={job_title}
              >
                {" "}
                baba
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Pay Grade</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setPayGrade(e.target.value);
                }}
                value={pay_grade}
              >
                {" "}
                baba
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Employee's Status</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setPayGrade(e.target.value);
                }}
                value={employee_status}
              >
                {" "}
                baba
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Contract Period</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setConractPeriod(e.target.value);
                }}
                value={contract_period}
              >
                {" "}
                baba
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Department</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
                value={department}
              >
                {" "}
                baba
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">First Name</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                value={first_name}
              >
                {" "}
                baba
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Last Name</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                value={last_name}
              >
                {" "}
                baba
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Address Line 1</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setAddressLine1(e.target.value);
                }}
                value={address_line1}
              >
                {" "}
                baba
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Address Line 2</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setAddressLine2(e.target.value);
                }}
                value={address_line2}
              >
                {" "}
                baba
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Town</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setTown(e.target.value);
                }}
                value={town}
              >
                {" "}
                baba
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Birth Date</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Birth Date"
                  value={birth_dater}
                  onChange={(newValue) => {
                    setBirthDateR(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Marital Status</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setMaritalStatus(e.target.value);
                }}
                value={marital_status}
              >
                {" "}
                baba
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Gender</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setGender(e.target.value);
                }}
                value={gender}
              >
                {" "}
                baba
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">
                  Employee's Contact Number
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setEmployeeContact(e.target.value);
                }}
                value={employee_contact}
              >
                {" "}
                baba
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Contact's First Name</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setContactFirstName(e.target.value);
                }}
                value={contact_first_name}
              >
                {" "}
                baba
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Contact's Last Name</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setContactLastName(e.target.value);
                }}
                value={contact_last_name}
              >
                {" "}
                baba
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Contact Relation</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setContactRelation(e.target.value);
                }}
                value={contact_relation}
              >
                {" "}
                baba
              </TextField>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={0}>
                <Typography align="center">Contact's Phone Number</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={(e) => {
                  setContactPhoneNumber(e.target.value);
                }}
                value={contact_phone_number}
              >
                {" "}
                baba
              </TextField>
            </Grid>
          </Grid>
          <Grid justifyItems={"center"}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {" "}
              Save Changes
            </Button>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
