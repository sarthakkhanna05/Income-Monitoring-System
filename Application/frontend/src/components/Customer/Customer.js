import React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router";
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

import CustNavBar from "./CustNavBar.js";

const theme = createTheme();

function Customer(props) {
  return (
    <div>
      <CustNavBar />
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
                  To Order Contact: +1 408-549 (5564)
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
    </div>
  );
}

export default Customer;
