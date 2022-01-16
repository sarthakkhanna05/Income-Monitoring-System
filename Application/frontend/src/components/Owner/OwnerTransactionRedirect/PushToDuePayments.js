import React from "react";
import Table from "react-bootstrap/Table";
// import { Button } from "react-bootstrap";
import { Button } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import SERVER_URL from "../../../config/config.js";
import { useHistory } from "react-router";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import { Row, Col } from "react-bootstrap";
import { useCart } from "react-use-cart";
import { maxHeight } from "@mui/system";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const theme = createTheme();

function PushToDuePayments(props) {
  var empIds = [];
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    transactions.forEach((transaction) => empIds.push(transaction.employee_id));
    let data = {
      message,
      empIds,
    };

    // console.log(data);

    axios
      .put(SERVER_URL + `/api/employee/sendMessageToEmployee`, data)
      .then((response) => {
        // console.log("=========== response==========", response.data);
        if (response.status === 200) {
          alert("Message Sent");
        }
      })
      .catch((error) => {
        // console.log("=============error=============", error);
        if (error.response.data.msg) {
          alert(error.response.data.msg);
        } else {
          alert("Unable to Send Message.");
        }
      });
    empIds = [];
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    // api call to fetch all products
    axios
      .get(SERVER_URL + `/api/transaction/fetchAllTransactionsWithDue`)
      .then((response) => {
        // console.log("=========== response==========", response.data);
        if (response.status === 200) {
          setTransactions(response.data);
          //   console.log(response.data);
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
              <td>{transaction.payment_due}</td>
              <td>{transaction.price}</td>
              <td>{transaction.discount}</td>
              <td>{transaction.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Card
        style={{
          margin: "5%",
          backgroundColor: "rgb(204, 207, 205)",
          maxHeight: "400px",
          minHeight: "400px",
        }}
      >
        <CardContent>
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography component="h1" variant="h5">
                  Send Message To Employee
                </Typography>
                <Box
                  component="form"
                  // onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="message"
                    label="Send Message To Employee"
                    name="message"
                    autoComplete="message"
                    autoFocus
                    value={message}
                    onChange={handleMessageChange}
                  />
                  <Button
                    type="button"
                    onClick={sendMessage}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Send Message
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </CardContent>
      </Card>
    </div>
  );
}

export default PushToDuePayments;
