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

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

function LeaveApplicationTable(props) {
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

  const handleAccept = (id) => {
    Axios.post("http://localhost:3001/accept_leave", {
      leave_id: id,
    })
      .then((response) => {
        console.log(response);
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
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(id);
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
            {rows.map((row) => {
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
                      onClick={() => handleAccept(row.leave_id)}
                    >
                      Accept
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
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
      </Paper>
    </div>
  );
}

// LeaveApplicationTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default LeaveApplicationTable;
