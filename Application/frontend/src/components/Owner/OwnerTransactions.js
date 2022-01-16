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
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import { useCart } from "react-use-cart";
import { maxHeight } from "@mui/system";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import OwnerNavBar from "./OwnerNavBar";

const theme = createTheme();

function OwnerTransactions(props) {
  let history = useHistory();

  const pushToAllTansactionsChanged = () => {
    history.push("/AllTransactionsChanged");
  };

  const pushToEmployeesWithHighSale = () => {
    // history.push("/pushToEmployeesWithHighSaleFromTo");
    history.push({
      pathname: "/pushToEmployeesWithHighSaleFromTo",
      state: { startDate, endDate }, // your data array of objects
    });
  };

  const pushToCustomersWithHighPurchases = () => {
    // history.push("/pushToEmployeesWithHighSaleFromTo");
    history.push({
      pathname: "/PushToCustomersWithHighPurchaseFromTo",
      state: { startDate, endDate }, // your data array of objects
    });
  };
  const pushCusWithHighestPurLastMonth = () => {
    // history.push("/pushToEmployeesWithHighSaleFromTo");
    history.push("/PushCusWithHighestPurLastMonth");
  };
  const pushToEmployeesWithHighSaleLasMon = () => {
    // history.push("/pushToEmployeesWithHighSaleFromTo");
    history.push({
      pathname: "/PushToEmployeesWithHighSaleLasMon",
      state: { month, year }, // your data array of objects
    });
  };

  const pushToTransactionsByEmployee = () => {
    // history.push("/pushToEmployeesWithHighSaleFromTo");
    history.push({
      pathname: "/PushToTransactionsByEmployee",
      state: { empName }, // your data array of objects
    });
  };

  const pushToTotalIncomeGenarated = () => {
    // history.push("/pushToEmployeesWithHighSaleFromTo");
    history.push("/PushToTotalIncomeGenarated");
  };

  const pushToTotalIncomeGenaratedLastMonth = () => {
    // history.push("/pushToEmployeesWithHighSaleFromTo");
    history.push("/PushToTotalIncomeGenaratedLastMonth");
  };

  const pushToTotalIncomeGenFromTo = () => {
    // history.push("/pushToEmployeesWithHighSaleFromTo");
    history.push({
      pathname: "/PushToTotalIncomeGenFromTo",
      state: { startDate, endDate }, // your data array of objects
    });
  };

  const pushToTotalIncomeGenaratedByEmployee = () => {
    // history.push("/pushToEmployeesWithHighSaleFromTo");
    history.push({
      pathname: "/PushToTotalIncomeGenaratedByEmployee",
      state: { empName }, // your data array of objects
    });
  };

  const pushToTopFiveSellingProducts = () => {
    // history.push("/pushToEmployeesWithHighSaleFromTo");
    history.push("/PushToTopFiveSellingProducts");
  };
  const pushToDuePayments = () => {
    // history.push("/pushToEmployeesWithHighSaleFromTo");
    history.push("/PushToDuePayments");
  };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [empName, setEmpName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  // console.log("@@@@@@@@@@@@@@@@@@", month, year);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleEmpNameChange = (e) => {
    setEmpName(e.target.value);
  };

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  return (
    <div>
      <OwnerNavBar />
      <Row>
        {" "}
        <Col>
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
                      Transactions which are changed by Employee
                    </Typography>
                    <Box
                      component="form"
                      // onSubmit={handleSubmit}
                      noValidate
                      sx={{ mt: 1 }}
                    >
                      <Button
                        type="button"
                        onClick={pushToAllTansactionsChanged}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Get Transactions
                      </Button>
                    </Box>
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
                      Get 5 Employees with highest sale
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
                        id="startDate"
                        label="Start Date"
                        name="startDate"
                        autoComplete="startDate"
                        autoFocus
                        value={startDate}
                        onChange={handleStartDateChange}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="endDate"
                        label="End Date"
                        name="endDate"
                        autoComplete="endDate"
                        autoFocus
                        value={endDate}
                        onChange={handleEndDateChange}
                      />
                      <Button
                        type="button"
                        onClick={pushToEmployeesWithHighSale}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Get Employees
                      </Button>
                    </Box>
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
                      Get top 5 customer with highest purchase
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
                        id="startDate"
                        label="Start Date"
                        name="startDate"
                        autoComplete="startDate"
                        autoFocus
                        value={startDate}
                        onChange={handleStartDateChange}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="endDate"
                        label="End Date"
                        name="endDate"
                        autoComplete="endDate"
                        autoFocus
                        value={endDate}
                        onChange={handleEndDateChange}
                      />
                      <Button
                        type="button"
                        onClick={pushToCustomersWithHighPurchases}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Get Customers
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            </CardContent>
          </Card>
        </Col>
      </Row>
      <Row>
        {" "}
        <Col>
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
                      Get top 5 customer with highest purchase last month
                    </Typography>
                    <Box
                      component="form"
                      // onSubmit={handleSubmit}
                      noValidate
                      sx={{ mt: 1 }}
                    >
                      <Button
                        type="button"
                        onClick={pushCusWithHighestPurLastMonth}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Get Customers
                      </Button>
                    </Box>
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
                      Get Employee sales for a particular month and year.
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
                        id="month"
                        label="Month"
                        name="Month"
                        autoComplete="Month"
                        autoFocus
                        value={month}
                        onChange={handleMonthChange}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="year"
                        label="Year"
                        name="Year"
                        autoComplete="Year"
                        autoFocus
                        value={year}
                        onChange={handleYearChange}
                      />

                      <Button
                        type="button"
                        onClick={pushToEmployeesWithHighSaleLasMon}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Get Employee Sales
                      </Button>
                    </Box>
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
                      Transactions by an employee
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
                        id="empName"
                        label="Employee Name"
                        name="empName"
                        autoComplete="Emploee Name"
                        autoFocus
                        value={empName}
                        onChange={handleEmpNameChange}
                      />

                      <Button
                        type="button"
                        onClick={pushToTransactionsByEmployee}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Get transactions
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            </CardContent>
          </Card>
        </Col>
      </Row>
      {/* ================= */}
      <Row>
        {" "}
        <Col>
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
                      Total income generated till now
                    </Typography>
                    <Box
                      component="form"
                      // onSubmit={handleSubmit}
                      noValidate
                      sx={{ mt: 1 }}
                    >
                      <Button
                        type="button"
                        onClick={pushToTotalIncomeGenarated}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Get Total Income
                      </Button>
                    </Box>
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
                      Total Income generated by a particular employee
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
                        id="empName"
                        label="Employee Name"
                        name="empName"
                        autoComplete="Emploee Name"
                        autoFocus
                        value={empName}
                        onChange={handleEmpNameChange}
                      />
                      <Button
                        type="button"
                        onClick={pushToTotalIncomeGenaratedByEmployee}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Get Total Income
                      </Button>
                    </Box>
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
                      Top 5 selling products last month
                    </Typography>
                    <Box
                      component="form"
                      // onSubmit={handleSubmit}
                      noValidate
                      sx={{ mt: 1 }}
                    >
                      <Button
                        type="button"
                        onClick={pushToTopFiveSellingProducts}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Get Products
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            </CardContent>
          </Card>
        </Col>
      </Row>
      {/* ====================last============ */}
      {/* ================= */}
      <Row>
        {" "}
        <Col>
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
                      Total Income Generated Last Month
                    </Typography>
                    <Box
                      component="form"
                      // onSubmit={handleSubmit}
                      noValidate
                      sx={{ mt: 1 }}
                    >
                      <Button
                        type="button"
                        onClick={pushToTotalIncomeGenaratedLastMonth}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Get Total Income
                      </Button>
                    </Box>
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
                      Total Income Generated
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
                        id="startDate"
                        label="Start Date"
                        name="startDate"
                        autoComplete="startDate"
                        autoFocus
                        value={startDate}
                        onChange={handleStartDateChange}
                      />
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="endDate"
                        label="End Date"
                        name="endDate"
                        autoComplete="endDate"
                        autoFocus
                        value={endDate}
                        onChange={handleEndDateChange}
                      />
                      <Button
                        type="button"
                        onClick={pushToTotalIncomeGenFromTo}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Get Employees
                      </Button>
                    </Box>
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
                      Due Payments
                    </Typography>
                    <Box
                      component="form"
                      // onSubmit={handleSubmit}
                      noValidate
                      sx={{ mt: 1 }}
                    >
                      <Button
                        type="button"
                        onClick={pushToDuePayments}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Get Due Payments
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </ThemeProvider>
            </CardContent>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default OwnerTransactions;
