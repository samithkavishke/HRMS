import React from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { AppBar, Toolbar } from "@mui/material";
import Axios from "axios";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import PendingIcon from "@mui/icons-material/Pending";
import { pink, blue, green } from "@mui/material/colors";

import { LoginContext, UserContext } from "../../Helper/UserContext";
import { useContext } from "react";

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function LeaveApplicationTable(props) {
  const { classes } = props;
  const { cookies } = useContext(LoginContext);
  const employee_id = cookies.emp_id;

  const [pendingRows, setPendingRows] = useState([]);
  const [approvedRows, setApprovedRows] = useState([]);
  const [declinedRows, setDeclinedRows] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (employee_id !== undefined) {
      Axios.get(`http://localhost:3001/get_leave_applications`, {
        params: {
          employee_id: employee_id,
          status: "0",
        },
      })
        .then((response) => {
          let fetchedrows = response.data.result;
          if (fetchedrows === undefined) {
            fetchedrows = [];
          }
          // setRows(fetchedrows);
          setDeclinedRows(fetchedrows);
          console.log(fetchedrows);
        })
        .catch((e) => {
          console.log(e);
        });

      Axios.get(`http://localhost:3001/get_leave_applications`, {
        params: {
          employee_id: employee_id,
          status: "1",
        },
      })
        .then((response) => {
          let fetchedrows = response.data.result;
          if (fetchedrows === undefined) {
            fetchedrows = [];
          }
          // setRows(fetchedrows);
          setApprovedRows(fetchedrows);
          console.log(fetchedrows);
        })
        .catch((e) => {
          console.log(e);
        });

      Axios.get(`http://localhost:3001/get_leave_applications`, {
        params: {
          employee_id: employee_id,
          status: "NULL",
        },
      })
        .then((response) => {
          let fetchedrows = response.data.result;
          if (fetchedrows === undefined) {
            fetchedrows = [];
          }
          // setRows(fetchedrows);
          setPendingRows(fetchedrows);
          console.log(fetchedrows);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const handleAccept = (id) => {
    Axios.post("http://localhost:3001/accept_leave", {
      leave_id: id,
    })
      .then((response) => {
        console.log(response);
        setApprovedRows([
          ...approvedRows,
          pendingRows.find((row) => row.leave_id === id),
        ]);
        setPendingRows(
          pendingRows.filter(function (row) {
            return row.leave_id != id;
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(id);
  };

  const handleReject = (id) => {
    Axios.post("http://localhost:3001/reject_leave", {
      leave_id: id,
    })
      .then((response) => {
        console.log(response);
        setDeclinedRows([
          ...declinedRows,
          pendingRows.find((row) => row.leave_id === id),
        ]);
        setPendingRows(
          pendingRows.filter(function (row) {
            return row.leave_id != id;
          })
        );
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(id);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="relative" color="primary">
        <Toolbar>
          <Button
            href="http://localhost:3000/Home"
            variant="contained"
            color="info"
          >
            Home
          </Button>
        </Toolbar>
      </AppBar>
      <Paper>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="icon label tabs example"
        >
          <Tab
            icon={<PendingIcon />}
            label="PENDING"
            fontSize="large"
            sx={{ color: blue[500] }}
            {...a11yProps(0)}
          />
          <Tab
            icon={<CheckIcon />}
            label="ACCEPTED"
            fontSize="large"
            sx={{ color: green[900] }}
            {...a11yProps(1)}
          />
          <Tab
            icon={<ClearIcon />}
            label="DECLINED"
            fontSize="large"
            sx={{ color: pink[500] }}
            {...a11yProps(2)}
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Leave ID </TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell> Leave Type</TableCell>
                <TableCell>From Date </TableCell>
                <TableCell>To Date </TableCell>

                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pendingRows.map((row) => {
                return (
                  <TableRow key={row.leave_id}>
                    <TableCell component="th" scope="row">
                      {row.leave_id}
                    </TableCell>
                    <TableCell>{row.employee_id}</TableCell>
                    <TableCell>{row.leave_type}</TableCell>
                    <TableCell>{row.from_date}</TableCell>
                    <TableCell>{row.to_date}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CheckIcon />}
                        onClick={() => handleAccept(row.leave_id)}
                      >
                        Accept
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        startIcon={<ClearIcon />}
                        color="inherit"
                        onClick={() => handleReject(row.leave_id)}
                      >
                        Decline
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Leave ID </TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell> Leave Type</TableCell>
                <TableCell>From Date </TableCell>
                <TableCell>To Date </TableCell>

                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {approvedRows.map((row) => {
                return (
                  <TableRow key={row.leave_id}>
                    <TableCell component="th" scope="row">
                      {row.leave_id}
                    </TableCell>
                    <TableCell>{row.employee_id}</TableCell>
                    <TableCell>{row.leave_type}</TableCell>
                    <TableCell>{row.from_date}</TableCell>
                    <TableCell>{row.to_date}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<CheckIcon />}
                      >
                        Accepted
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Leave ID </TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell> Leave Type</TableCell>
                <TableCell>From Date </TableCell>
                <TableCell>To Date </TableCell>

                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {declinedRows.map((row) => {
                return (
                  <TableRow key={row.leave_id}>
                    <TableCell component="th" scope="row">
                      {row.leave_id}
                    </TableCell>
                    <TableCell>{row.employee_id}</TableCell>
                    <TableCell>{row.leave_type}</TableCell>
                    <TableCell>{row.from_date}</TableCell>
                    <TableCell>{row.to_date}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<ClearIcon />}
                      >
                        Declined
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TabPanel>
      </Paper>
    </div>
  );
}

// LeaveApplicationTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default LeaveApplicationTable;
