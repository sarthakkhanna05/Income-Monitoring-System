import React from "react";
import axios from "axios";
import { useHistory } from "react-router";
import { useEffect } from "react";
import SERVER_URL from "../../config/config.js";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import UpdateIcon from "@mui/icons-material/Update";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();
const userData = JSON.parse(localStorage.getItem("userData"));
var id = userData.employee_id;

const UpdateEmpProfile = () => {
  let history = useHistory();
  const [name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // const handleLastNameChange = (e) => {
  //   setLastName(e.target.value);
  // };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    axios
      .get(SERVER_URL + `/api/employee/getEmpInfo?id=${id}`)
      .then((response) => {
        // console.log(
        //   "===========update response==========",
        //   response.data[0].emp_name
        // );
        if (response.status === 200) {
          setName(response.data[0].emp_name);
          setContactNumber(response.data[0].contact_no);
          setAddress(response.data[0].address);
          // history.push("/Employee");
        }
      })
      .catch((error) => {
        // console.log("=============error=============", error);
        if (error.response.data.msg) {
          alert(error.response.data.msg);
        } else {
          alert("Unable to update employee information in database.");
        }
      });
  }, []);

  //console.log(name);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    let updateData = {
      id: id,
      name: name,
      contactNumber: contactNumber,
      address: address,
    };

    // console.log(updateData);

    axios
      .put(SERVER_URL + `/api/employee/updateEmpInfo`, updateData)
      .then((response) => {
        // console.log("===========response==========", response.data[0].emp_name);
        if (response.status === 200) {
          setName(response.data[0].emp_name);
          setContactNumber(response.data[0].contact_no);
          setAddress(response.data[0].address);
          alert("Employee Profile Updated");
          // history.push("/Employee");
        }
      })
      .catch((error) => {
        // console.log("=============error=============", error);
        if (error.response.data.msg) {
          alert(error.response.data.msg);
        } else {
          alert("Unable to fetch employee information from database.");
        }
      });
  };

  return (
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
            <UpdateIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Update Employee Profile
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={name}
                  onChange={handleNameChange}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Contact Number"
                  label="Contact Number"
                  type="number"
                  id="Contact Number"
                  autoComplete="Contact Number"
                  value={contactNumber}
                  onChange={handleContactNumberChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="address"
                  label="address"
                  id="address"
                  autoComplete="address"
                  value={address}
                  onChange={handleAddressChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
            {/* <Grid container justifyContent="flex-end"> */}
            {/* <Grid item> */}
            {/* </Grid> */}
            {/* </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UpdateEmpProfile;
