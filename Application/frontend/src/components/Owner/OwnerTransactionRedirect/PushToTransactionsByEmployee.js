import React from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap/Table";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import SERVER_URL from "../../../config/config.js";

function PushToTransactionsByEmployee(props) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // api call to fetch all products
    axios
      .get(
        SERVER_URL +
          `/api/transaction/fetchAllTransactionsOfEmp?name=${props.location.state.empName}`
      )
      .then((response) => {
        // console.log("=========== response==========", response.data);
        if (response.status === 200) {
          setTransactions(response.data);
          console.log(response.data);
        }
      })
      .catch((error) => {
        // console.log("=============error=============", error);
        if (error.response.data.msg) {
          alert(error.response.data.msg);
        } else {
          alert("Unable to fetch products from database.");
        }
      });
  }, []);
  return (
    <div>
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>Employee Id</th>
            <th>Employee Name</th>
            <th>Employee Email</th>
            <th>Product Name</th>
            <th>Product Id</th>
            <th>Product Price</th>
            <th>Transaction Id</th>
            <th>Transaction Date</th>
            <th>Quantity</th>
            <th>Payment Due</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr>
              <td>{transaction.employee_id}</td>
              <td>{transaction.emp_name}</td>
              <td>{transaction.email}</td>
              <td>{transaction.product_name}</td>
              <td>{transaction.product_id}</td>
              <td>{transaction.product_price}</td>
              <td>{transaction.transaction_id}</td>
              <td>{transaction.tran_date}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.payment_due}</td>
              <td>{transaction.price}</td>
              <td>{transaction.discount}</td>
              <td>{transaction.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PushToTransactionsByEmployee;
