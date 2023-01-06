import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "axios";

export default function ChangeSalary() {
  const [rows, setRows] = useState([
  ]);

  useEffect(() => {
    Axios.get(`http://localhost:3001/get_salaries`, {})
      .then((response) => {
        const fetchedrows = response.data.result;
        for (let i = 0; i < response.data.result.length; i++) {
          fetchedrows[i].id = i + 1;
        }
        setRows(fetchedrows);
        console.log(fetchedrows);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleRowEditCommit = (params) => {
    
    console.log("hi");
    const id = params.id;
    const key = params.field;
    const value = params.value;
    console.log(params.id);

    // Find the index of the row that was edited
    const index = rows.findIndex((row) => row.id === id);
    const pre_pay_grade = rows[index].pay_grade;
    const pre_job_title = rows[index].job_title;

    // Create a new copy of the rows array
    const updatedRows = [...rows];

    // Update the value of the edited cell in the new rows array
    updatedRows[index] = {
      ...updatedRows[index],
      [key]: value,
    };
    // Update the rows state with the new rows array
    setRows(updatedRows);
    console.log(updatedRows[index]);
    Axios.post("http://localhost:3001/Change_Salary", {

      pay_grade: updatedRows[index].pay_grade,
      job_title: updatedRows[index].job_title,
      salary: updatedRows[index].salary,
      pre_pay_grade:pre_pay_grade,
      pre_job_title:pre_job_title
    })
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        editMode="cell"
        rows={rows}
        columns={columns}
        onCellEditCommit={handleRowEditCommit}
      />
    </div>
  );
}

const columns = [
  { field: "pay_grade", headerName: "Pay Grade", width: 180, editable: true },
  { field: "job_title", headerName: "Job Title", width: 180, editable: true },
  {
    field: "salary",
    headerName: "Salary",
    width: 180,
    type: "number",
    editable: true,
  },
];
