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
import { useCart } from "react-use-cart";

const theme = createTheme();

function EmpTransactions(props) {
  let history = useHistory();

  const userData = JSON.parse(localStorage.getItem("userData"));
  var empId = userData.employee_id;
  // console.log("==============", empId);

  var today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  // console.log("##################", date);

  const { setItems } = useCart();
  const [email, setEmail] = useState("");
  const [discount, setDiscount] = useState(0);
  const [modalState, setModalState] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [cusId, setCusid] = useState("");
  const [productsAddedToCart, setProductsAddedToCart] = useState([]);
  const [allInfoExport, setAllInfoExport] = useState({});
  // const [qty, setQty] = useState(0);

  console.log("==============xxxxxxxxxxxxx===============", cusId);

  useEffect(() => {}, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
  };

  const handleSendData = (e) => {
    const data = {
      cusId,
      empId,
      date,
      qty: productsAddedToCart.length,
      payDue: 0,
      discount,
      products: productsAddedToCart,
    };

    setAllInfoExport(data);
    axios
      .post(SERVER_URL + "/api/employee/addTransaction", data)
      .then((response) => {
        // console.log("===========response==========", response);
        if (response.status === 200) {
          history.push("/Employee");
        }
      })
      .catch((error) => {
        // console.log(error);
        // if (error.response.data.msg) {
        // alert(error.response.data.msg);
        // } else {
        alert({ msg: "Unable to create transaction." });
        // }
      });
  };

  const deleteTransaction = (empId, cusId, transactionId, today, productId) => {
    const data = {
      empId,
      cusId,
      transactionId,
      curDate: today,
      productId,
    };
    // api to delete a transaction given tran id
    axios
      .post(SERVER_URL + `/api/transaction/deletTransaction`, data)
      .then((response) => {
        // console.log("=========== response==========", response.data);
        if (response.status === 200) {
          window.location.reload(false);
        }
      })
      .catch((error) => {
        // console.log("=============error=============", error);
        if (error.response.data.msg) {
          alert(error.response.data.msg);
        } else {
          alert("Unable to delete this Transaction.");
        }
      });
  };

  const handleSubmit = async (event) => {
    // var temp = null;
    // api call for to get cust id given cust email
    axios
      .get(SERVER_URL + `/api/customer/getCustIdGivenEmail?email=${email}`)
      .then((response) => {
        console.log(
          "=========== response==========",
          response.data[0].customer_id
        );
        if (response.status === 200) {
          setCusid(response.data[0].customer_id);
          // temp = response.data[0].customer_id;
          // console.log("Here " + temp);
          // var cusId = response.data[0].customer_id; // might need to save in LS
          setModalState(0);

          // api call to fetch all transaction_view of cust given cust id
          axios
            .get(
              SERVER_URL +
                `/api/transaction/fetchAllTransactionsView?id=${response.data[0].customer_id}`
            )
            .then((response) => {
              // console.log("=========== response==========", response.data);
              if (response.status === 200) {
                setTransactions(response.data); // might need to save in LS
              }
            })
            .catch((error) => {
              // console.log("=============error=============", error);
              if (error.response.data.msg) {
                alert(error.response.data.msg);
              } else {
                alert("Unable to fetch transactions from database.");
              }
            });
        }
      })
      .catch((error) => {
        console.log("=============error=============", error);
        if (error.response.data.msg) {
          alert(error.response.data.msg);
        } else {
          alert("Unable to fetch customer information from database.");
        }
      });
  };
  return (
    <div>
      <div>
        {modalState !== 0 ? (
          <Card style={{ margin: "5%", backgroundColor: "rgb(204, 207, 205)" }}>
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
                    <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                      <PersonIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                      Enter Customer Email
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
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={handleEmailChange}
                      />

                      <Button
                        type="button"
                        onClick={handleSubmit}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Get Customer Id
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            </CardContent>
          </Card>
        ) : null}

        {modalState !== 1 ? (
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
                <th>Delete Transaction</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr>
                  <td>{transaction.customer_id}</td>
                  <td>{transaction.cus_name}</td>
                  <td>{transaction.email}</td>
                  <td>{transaction.product_name}</td>
                  <td>{transaction.product_id}</td>
                  <td>{transaction.product_price}</td>
                  <td>{transaction.transaction_id}</td>
                  <td>{transaction.employee_id}</td>
                  <td>{transaction.tran_date}</td>
                  <td>{transaction.quantity}</td>
                  <td>{transaction.payment_due}</td>
                  <td>{transaction.price}</td>
                  <td>{transaction.discount}</td>
                  <td>{transaction.total}</td>
                  <td>
                    <Button
                      // value={employee.employee_id}
                      type="submit"
                      // onClick={() => fireEmployee(employee.employee_id)}
                      onClick={() =>
                        deleteTransaction(
                          transaction.employee_id,
                          transaction.customer_id,
                          transaction.transaction_id,
                          transaction.tran_date,
                          transaction.product_id
                        )
                      }
                      color="error"
                      variant="contained"
                      // disabled="false"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
      </div>
    </div>
  );
}

export default EmpTransactions;
