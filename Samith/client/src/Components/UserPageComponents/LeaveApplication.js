import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Axios from "axios";
import { useEffect, useState, useContext } from "react";
import Navigate from "react";
import { LoginContext, UserContext } from "../../Helper/UserContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const theme = createTheme();

function LeaveForm(props) {
  const { cookies } = useContext(LoginContext);
  const employee_id = cookies.emp_id;
  console.log(employee_id);
  // const rows = {};
  let remain_leaves_dict = {};
  const [remainDays, setRemaindays] = useState({});
  useEffect(() => {
    Axios.get(`http://localhost:3001/is_applicable`, {
      params: { employee_id: cookies.emp_id },
    })
      .then((response) => {
        const applicable = response.data.applicable;
        if (!applicable) {
          const remain_leaves = response.data.remain_leaves;
          console.log(remain_leaves);
          console.log(response.data.status);
          // remain_leaves_dict = response.data.remain_leaves;

          setRemaindays(response.data.remain_leaves);

          return console.log("Not Applicable", employee_id);
          // return <Navigate />;
        }
        console.log("Applicable");
        setRemaindays(response.data.remain_leaves);
        console.log(response.data.remain_leaves);

        console.log(remainDays);
        // console.log(remain_leaves_dict);
        // console.log(remain_leaves1);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  /////// DUMMY Code for the Remaining Number of Days fro Leaves Code
  const { classes } = props;
  const [rows, setRows] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:3001/get_leave_applications`, {})
      .then((response) => {
        let fetchedrows = response.data.result;
        if (fetchedrows === undefined) {
          fetchedrows = [];
        }
        // setRows(fetchedrows);
        setRows(fetchedrows);
        console.log(fetchedrows);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  ///////////////////////////////////////////

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let totalValid = true;
    // setEmployerID(event.target.employerid);
    // setLeaveType(event.target.leavetype);
    console.log(toValue - fromValue);
    if (fromValue < toValue) {
      setValid(true);
    } else {
      setValid(false);
      totalValid = false;
    }

    if (totalValid) {
      Axios.post("http://localhost:3001/leave-application", {
        employerID: employee_id,
        leaveType: leaveType,
        fromValue: fromValue,
        toValue: toValue,
        // username: data.get("username"),
        // password: data.get("password"),
      })
        .then((response) => {})
        .catch((e) => {
          console.log(e);
        });
    }
  };
  // const handleSubmit = () =>{}
  // const [employerID, setEmployerID] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [fromValue, setFromValue] = useState(null);
  const [toValue, setToValue] = useState(null);
  const [valid, setValid] = useState(false);

  const typeChange = (event) => {
    setLeaveType(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Leave Application
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="employerid"
                  required
                  fullWidth
                  id="employerid"
                  label="Employer ID"
                  autoFocus
                />
              </Grid> */}
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id="leave-type-label" defaultValue={""}>
                    Leave Type
                  </InputLabel>
                  <Select
                    // labelId="leave-type-label"
                    id="leavetype"
                    value={leaveType}
                    label="Leave Type"
                    onChange={typeChange}
                    defaultValue=""
                  >
                    <MenuItem value={"Annual_leave"}>Annual Leave</MenuItem>
                    <MenuItem value={"Maternal_leave"}>Maternal Leave</MenuItem>
                    <MenuItem value={"Casual_leave"}>Casual Leave</MenuItem>
                    <MenuItem value={"no_pay_leave"}>No Pay Leave</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    format
                    label="From"
                    value={fromValue}
                    onChange={(newValue) => {
                      setFromValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="To"
                    value={toValue}
                    onChange={(newValue) => {
                      setToValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
            {!valid && (
              <Typography
                component="h6"
                variant="h6"
                align="center"
                color="#ff0000"
              >
                *Wrong Date
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>

        <br></br>
        <Typography variant="h5">Number of days of leave remaining</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Annual Leave</TableCell>
              <TableCell>Maternal Leave</TableCell>
              <TableCell>Casual Leave</TableCell>
              <TableCell>No Pay Leave</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={0}>
              <TableCell>{remainDays.Annual_leave}</TableCell>
              <TableCell>{remainDays.Maternal_leave}</TableCell>
              <TableCell>{remainDays.Casual_leave}</TableCell>
              <TableCell>{remainDays.no_pay_leave}</TableCell>
            </TableRow>
            {/* {rows.map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{row.Annual_leave}</TableCell>
                  <TableCell>{row.Maternal_leave}</TableCell>
                  <TableCell>{row.Casual_leave}</TableCell>
                  <TableCell>{row.no_pay_leave}</TableCell>
                </TableRow>
              );
            })} */}
          </TableBody>
        </Table>
      </Container>
    </ThemeProvider>
  );
}

export default LeaveForm;
