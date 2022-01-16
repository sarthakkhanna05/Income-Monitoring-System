import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useHistory } from "react-router";
import { useEffect } from "react";
import SERVER_URL from "../../config/config.js";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "@mui/material/Button";

function EmployeeToCustomers(props) {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // api fetch all Customers
    axios
      .get(SERVER_URL + `/api/customer/getAllCustomers`)
      .then((response) => {
        // console.log("=========== response==========", response.data);
        if (response.status === 200) {
          setCustomers(response.data); // might need to save in LS
          //   console.log(response.data);
        }
      })
      .catch((error) => {
        // console.log("=============error=============", error);
        if (error.response.data.msg) {
          alert(error.response.data.msg);
        } else {
          alert("Unable to fetch Customers from database.");
        }
      });
  }, []);
  return (
    <div>
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>Customer Id</th>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Product Name</th>
            <th>Product Id</th>
            <th>Product Price</th>
            <th>Transaction Id</th>
            <th>Employee Id</th>
            <th>Transaction Date</th>
            <th>Quantity</th>
            <th>Payment Due</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr>
              <td>{customer.customer_id}</td>
              <td>{customer.cus_name}</td>
              <td>{customer.email}</td>
              <td>{customer.product_name}</td>
              <td>{customer.product_id}</td>
              <td>{customer.product_price}</td>
              <td>{customer.transaction_id}</td>
              <td>{customer.employee_id}</td>
              <td>{customer.tran_date}</td>
              <td>{customer.quantity}</td>
              <td>{customer.payment_due}</td>
              <td>{customer.price}</td>
              <td>{customer.discount}</td>
              <td>{customer.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default EmployeeToCustomers;
