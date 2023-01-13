import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Axios from "axios";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DepartmentLeaves() {
  const [rows, setRows] = useState([]);
  const [fromValue, setFromValue] = useState(new Date());
  const [toValue, setToValue] = useState(new Date());

  useEffect(() => {
    if (fromValue <= toValue) {
      Axios.get(`http://localhost:3001/get_leaves_by_department`, {
        params: {
          fromValue: fromValue,
          toValue: toValue,
        },
      })
        .then((response) => {
          let fetchedrows = response.data.result;
          if (fetchedrows === undefined) {
            fetchedrows = [];
          }
          setRows(fetchedrows);
          console.log("hi", fetchedrows);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
    }
  }, [fromValue, toValue]);

  return (
    <Container>
      <div>
        <Box sx={{ m: 10 }}>
          <FormControl sx={{ m: 2, minWidth: 150, marginLeft: 5 }}>
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
          </FormControl>
          <FormControl sx={{ m: 2, minWidth: 150 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                format
                label="To"
                value={toValue}
                onChange={(newValue) => {
                  setToValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </Box>
      </div>
      <TableContainer component={Paper} sx={{ marginTop: 8 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Department</TableCell>
              <TableCell align="right">No: Absents</TableCell>
              <TableCell align="right">No: Presents</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.department}
                </TableCell>
                <TableCell align="right">{row.no_leaves}</TableCell>
                <TableCell align="right">{row.no_present}</TableCell>
                {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
