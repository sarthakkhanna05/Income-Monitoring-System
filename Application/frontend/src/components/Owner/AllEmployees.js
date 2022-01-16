import React from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useEffect } from "react";
import SERVER_URL from "../../config/config.js";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "@mui/material/Button";

function AllEmployees(props) {
  let history = useHistory();
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    // api call to fetch all employees
    axios
      .get(SERVER_URL + `/api/employee/getAllEmployees`)
      .then((response) => {
        // console.log("=========== response==========", response.data);
        if (response.status === 200) {
          setEmployees(response.data); // might need to save in LS
        }
      })
      .catch((error) => {
        // console.log("=============error=============", error);
        if (error.response.data.msg) {
          alert(error.response.data.msg);
        } else {
          alert("Unable to fetch employees from database.");
        }
      });
  }, []);

  const fireEmployee = (id) => {
    // api to delete account i.e deleting creds from db table
    axios
      .delete(SERVER_URL + `/api/employee/fireEmployee?id=${id}`)
      .then((response) => {
        if (response.status === 200) {
          alert("Employee Fired!!");
          window.location.reload(false);
        }
      })
      .catch((error) => {
        if (error.response.data.msg) {
          alert(error.response.data.msg);
        } else {
          alert("Unable to fire employee.");
        }
      });
    // console.log(id);
  };

  return (
    <div>
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Contact Number</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Address</th>
            {/* <th>Fire Employee</th> */}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr>
              <td>{employee.employee_id}</td>
              <td>{employee.emp_name}</td>
              <td>{employee.contact_no}</td>
              <td>{employee.gender}</td>
              <td>{employee.email}</td>
              <td>{employee.address}</td>
              {/* <td>
                <Button
                  // value={employee.employee_id}
                  type="submit"
                  onClick={() => fireEmployee(employee.employee_id)}
                  // onClick={() => fireEmployee("ROhit")}
                  color="error"
                  variant="contained"
                >
                  Fire Employee
                </Button>
              </td> */}

              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AllEmployees;
