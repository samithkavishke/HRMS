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

import { LoginContext, UserContext } from "../../Helper/UserContext";
import { useContext } from "react";


function ViewSubordinates() {
  const [rows, setRows] = useState([]);

    const { cookies } = useContext(LoginContext);
    const employee_id = cookies.emp_id;

  useEffect(() => {
    Axios.get(`http://localhost:3001/get_subordinates`, {
      params:{
        employee_id:employee_id
    }})
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
              <TableCell>Employee ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Pay Grade</TableCell>
              <TableCell>Employee Status</TableCell>
              <TableCell>Contract Status</TableCell>
              <TableCell>Department</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow key={row.employee_id}>
                  <TableCell component="th" scope="row">
                    {row.employee_id}
                  </TableCell>
                  <TableCell>{row.first_name}</TableCell>
                  <TableCell>{row.last_name}</TableCell>
                  <TableCell>{row.pay_grade}</TableCell>
                  <TableCell>{row.employee_status}</TableCell>
                  <TableCell>{row.contract_period}</TableCell>
                  <TableCell>{row.department}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default ViewSubordinates;
