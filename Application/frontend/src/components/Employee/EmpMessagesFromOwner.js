import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useHistory } from "react-router";
import { useEffect } from "react";
import SERVER_URL from "../../config/config.js";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "@mui/material/Button";

function EmpMessagesFromOwner(props) {
  const [message, setMessage] = useState("");
  //   console.log(message);

  const userData = JSON.parse(localStorage.getItem("userData"));
  var empId = userData.employee_id;

  useEffect(() => {
    // api call to fetch message from Owner
    axios
      .get(SERVER_URL + `/api/employee/getEmployeeMessage?id=${empId}`)
      .then((response) => {
        // console.log("=========== response==========", response.data);
        if (response.status === 200) {
          setMessage(response.data[0].OwnerMessage); // might need to save in LS
          //   console.log(response.data);
        }
      })
      .catch((error) => {
        // console.log("=============error=============", error);
        if (error.response.data.msg) {
          alert(error.response.data.msg);
        } else {
          alert("Unable to fetch employee message.");
        }
      });
  }, []);
  return (
    <div>
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{message === null ? "No Messages" : message}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default EmpMessagesFromOwner;
