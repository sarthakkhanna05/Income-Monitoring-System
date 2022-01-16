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
import { Row, Col } from "react-bootstrap";

const theme = createTheme();

function EmpProducts(props) {
  let history = useHistory();

  const userData = JSON.parse(localStorage.getItem("userData"));
  var empId = userData.employee_id;

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
  const [products, setProducts] = useState([]);
  const [cusId, setCusid] = useState("");
  const [productsAddedToCart, setProductsAddedToCart] = useState([]);
  const [allInfoExport, setAllInfoExport] = useState({});
  const [custLastTranDate, setCustLastTranDate] = useState("");
  const [membershipStatus, setMembershipStatus] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState([]);

  console.log("==============", products);

  // const [qty, setQty] = useState(0);

  console.log("==============xxxxxxxxxxxxx===============", products);

  useEffect(() => {
    // api call to fetch all products
    axios
      .get(SERVER_URL + `/api/product/getAllProducts`)
      .then((response) => {
        // console.log("=========== response==========", response.data);
        if (response.status === 200) {
          setProducts(response.data); // might need to save in LS
        }
      })
      .catch((error) => {
        // console.log("=============error=============", error);
        // if (error.response.data.msg) {
        // alert(error.response.data.msg);
        // } else {
        alert("Unable to fetch products from database.");
        // }
      });
  }, []);

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

    console.log("========data======", data);

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
        console.log("============error==============", error);

        alert("Unable to create transaction.");
      });
  };

  // console.log(email);

  useEffect(() => {}, []);

  const addToCart = (productId, productName, productPrice) => {
    setProductsAddedToCart((productsAddedToCart) => [
      ...productsAddedToCart,
      { productId, productName, productPrice },
    ]);
  };

  const handleSubmit = async (event) => {
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
          // var cusId = response.data[0].customer_id; // might need to save in LS

          // // api to get customer last transaction date
          axios
            .get(
              SERVER_URL +
                `/api/transaction/cusLastTranDate?id=${response.data[0].customer_id}`
            )
            .then((response) => {
              // console.log("=========== response==========", response.data);
              if (response.status === 200) {
                setCustLastTranDate(response.data[0].maxDate);
              }
            })
            .catch((error) => {
              // console.log("=============error=============", error);
              if (error.response.data.msg) {
                alert(error.response.data.msg);
              } else {
                alert("Unable to fetch Customer's last transaction Date.");
              }
            });

          // // api to get customer membership status
          axios
            .get(
              SERVER_URL +
                `/api/customer/getMembershipStatus?id=${response.data[0].customer_id}`
            )
            .then((response) => {
              // console.log("=========== response==========", response.data);
              if (response.status === 200) {
                setMembershipStatus(response.data[0].membership);
              }
            })
            .catch((error) => {
              // console.log("=============error=============", error);
              if (error.response.data.msg) {
                alert(error.response.data.msg);
              } else {
                alert("Unable to fetch customer Membership Status.");
              }
            });
          setModalState(0);
        }
      })
      .catch((error) => {
        // console.log("=============error=============", error);
        // if (error.response.data.msg) {
        // alert(error.response.data.msg);
        // } else {
        alert("Unable to fetch customer information from database.");
        // }
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
                <th>Product Id</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Available Quantity</th>
                <th>Add TO Cart</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr>
                  <td>{product.product_id}</td>
                  <td>{product.product_name}</td>
                  <td>{product.product_price}</td>
                  <td>{product.product_quantity}</td>
                  <td>
                    <Button
                      // value={employee.employee_id}
                      type="submit"
                      onClick={(e) => {
                        setButtonDisabled([...buttonDisabled, index]);
                        addToCart(
                          product.product_id,
                          product.product_name,
                          product.product_price
                        );
                      }}
                      // onClick={() => fireEmployee(employee.employee_id)}
                      // onClick={() => fireEmployee("Rohit")}
                      color="error"
                      variant="contained"
                      disabled={buttonDisabled.includes(index)}
                    >
                      Add To Cart
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
        {modalState !== 1 ? (
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
                  Enter Discount
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
                    id="discount"
                    label="Discount"
                    name="discount"
                    autoComplete="discount"
                    autoFocus
                    value={discount}
                    onChange={handleDiscountChange}
                  />

                  <Button
                    type="button"
                    onClick={handleSendData}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Container>
            <Row>
              {" "}
              <Col>
                <Card
                  style={{
                    margin: "5%",
                    backgroundColor: "rgb(204, 207, 205)",
                    maxHeight: "200px",
                    minHeight: "200px",
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
                            Customer Last Transaction Date: {custLastTranDate}
                          </Typography>
                          <Box
                            component="form"
                            // onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                          ></Box>
                        </Box>
                      </Container>
                    </ThemeProvider>
                  </CardContent>
                </Card>
              </Col>
              <Col>
                <Card
                  style={{
                    margin: "5%",
                    backgroundColor: "rgb(204, 207, 205)",
                    maxHeight: "200px",
                    minHeight: "200px",
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
                            Membership Status:{" "}
                            {membershipStatus === 1 ? "Yes" : "No"}
                          </Typography>
                          <Box
                            component="form"
                            // onSubmit={handleSubmit}
                            noValidate
                            sx={{ mt: 1 }}
                          ></Box>
                        </Box>
                      </Container>
                    </ThemeProvider>
                  </CardContent>
                </Card>
              </Col>
            </Row>
          </ThemeProvider>
        ) : null}
      </div>
    </div>
  );
}

export default EmpProducts;
