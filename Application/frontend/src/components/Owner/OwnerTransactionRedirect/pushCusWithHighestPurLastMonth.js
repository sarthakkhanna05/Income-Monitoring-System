import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useHistory } from "react-router";
import { useEffect } from "react";
import SERVER_URL from "../../../config/config.js";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "@mui/material/Button";

function PushCusWithHighestPurLastMonth(props) {
  //   console.log(
  //     "===================",
  //     props.location.state.startDate,
  //     props.location.state.endDate
  //   );
  let history = useHistory();
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // api call to fetch all cust wit highest pur last month
    axios
      .get(SERVER_URL + `/api/customer/getFiveCusHighPurLasMon`)
      .then((response) => {
        // console.log("=========== response==========", response.data);
        if (response.status === 200) {
          setCustomers(response.data[0]); // might need to save in LS
          console.log(response.data[0]);
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
  return (
    <div>
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr>
              <td>{customer.cus_name}</td>
              <td>{customer.Total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PushCusWithHighestPurLastMonth;
