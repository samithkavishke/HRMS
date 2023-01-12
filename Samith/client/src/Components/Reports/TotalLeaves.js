import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import Axios from "axios";
import { AppBar, Toolbar } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function DepartmentLeaves() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    Axios.get(`http://localhost:3001/get_leaves_by_department`, {})
      .then((response) => {
        let fetchedrows = response.data.result;
        if (fetchedrows === undefined) {
          fetchedrows = [];
        }
        setRows(fetchedrows);
        console.log(fetchedrows);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{marginTop : 8}}
    >
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
  );
}
