import React from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useEffect } from "react";
import SERVER_URL from "../../config/config.js";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import { useState } from "react";
import Table from "react-bootstrap/Table";

function CustPayment(props) {
  const userData = JSON.parse(localStorage.getItem("userData"));
  var cusId = userData.customer_id;
  // console.log("==============", empId);

  const [transactions, setTransactions] = useState([]);

  const updateTransactionPaymentDue = (id) => {
    axios
      .put(SERVER_URL + `/api/transaction/updateTransactionPayDueCol?id=${id}`)
      .then((response) => {
        // console.log("=========== response==========", response.data);
        if (response.status === 200) {
          alert("Payment Successful.");
          window.location.reload(false);
        }
      })
      .catch((error) => {
        // console.log("=============error=============", error);
        alert("Unable to update transaction.");
      });
    // console.log(id);
  };

  useEffect(() => {
    // api call to fetch all transactions
    axios
      .get(SERVER_URL + `/api/transaction/fetchAllTransactions?id=${cusId}`)
      .then((response) => {
        // console.log("=========== response==========", response.data);
        if (response.status === 200) {
          setTransactions(response.data);
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
            <th>Transaction Id</th>
            <th>Employee Id</th>
            <th>Customer Id</th>
            <th>Transaction Date</th>
            <th>Quantity</th>
            <th>Payment Due</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Total</th>
            <th>Pay</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr>
              <td>{transaction.transaction_id}</td>
              <td>{transaction.employee_id}</td>
              <td>{transaction.customer_id}</td>
              <td>{transaction.tran_date}</td>
              <td>{transaction.quantity}</td>
              <td>{transaction.payment_due === 0 ? "Payment Due" : "Paid"}</td>
              <td>{transaction.price}</td>
              <td>{transaction.discount}</td>
              <td>{transaction.total}</td>
              <td>
                {transaction.payment_due === 0 ? (
                  <Button
                    // value={employee.employee_id}
                    type="submit"
                    onClick={() =>
                      updateTransactionPaymentDue(transaction.transaction_id)
                    }
                    color="error"
                    variant="contained"
                  >
                    Pay
                  </Button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CustPayment;
