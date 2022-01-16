import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useHistory } from "react-router";
import { useEffect } from "react";
import SERVER_URL from "../../../config/config.js";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "@mui/material/Button";

function PushToEmployeesWithHighSaleLasMon(props) {
  let history = useHistory();

  const [employees, setEmployees] = useState([]);
  const [toPrint, setToPrint] = useState([]);

  console.log("=============", toPrint);

  useEffect(() => {
    var dataMonYr = {
      year: props.location.state.year,
      month: props.location.state.month,
    };

    // api call to fetch all employees
    axios
      .post(SERVER_URL + `/api/employee/getAllEmployeeSales`, dataMonYr)
      .then((response) => {
        // console.log("=========== response==========", response.data);
        if (response.status === 200) {
          setEmployees(response.data[0]); // might need to save in LS
          setToPrint(response.data[0].emp_names);
          // console.log(response.data[0]);
        }
      })
      .catch((error) => {
        // console.log("=============error=============", error);
        // if (error.response.data.msg) {
        // alert(error.response.data.msg);
        // } else {
        alert("Unable to fetch employee sales Data fromdatabase.");
        // }
      });
  }, []);
  return (
    <div>
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {toPrint.map((emp_name, index) => (
            <tr>
              <td>{employees.emp_names[index]}</td>
              <td>{employees.total_sales[index]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PushToEmployeesWithHighSaleLasMon;
