import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import SERVER_URL from "../../config/config.js";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import AssignmentIndSharpIcon from "@mui/icons-material/AssignmentIndSharp";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import { NativeSelect } from "@mui/material";
import { SignUpApi } from "../../api/authApi.js";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
const theme = createTheme();

export default function SignUp() {
  let history = useHistory();

  const [Name, setName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigatioBarValue, setnavigatioBarValue] = useState(0);
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [member, setMember] = useState(0);
  console.log(member);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // const handleLastNameChange = (e) => {
  //   setLastName(e.target.value);
  // };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleContactNumberChange = (e) => {
    setContactNumber(e.target.value);
  };

  const handlegenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handleMemberChange = (e) => {
    setMember(e.target.value);
  };

  // console.log(navigatioBarValue);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: Name,
      contact_no: contactNumber,
      gender: gender,
      email: email,
      address: address,
      password: password,
      persona: navigatioBarValue,
      member,
    };
    // eslint-disable-next-line no-console
    // console.log("============data========", data);

    axios
      .post(SERVER_URL + "/api/auth/SignUp", data)
      .then((response) => {
        // console.log("===========response==========", response);
        if (response.status === 200) {
          history.push("/");
        } else if (response.status === 204) {
          alert("Account Alredy Exists");
        }
      })
      .catch((error) => {
        // console.log(error);
        if (error.response.data.msg) {
          alert(error.response.data.msg);
        } else {
          console.alert("Error occured while signing up");
        }
      });

    setName("");
    // const [lastName, setLastName] = useState("");
    setEmail("");
    setPassword("");
    setnavigatioBarValue(0);
    setContactNumber("");
    setGender("");
    setAddress("");
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
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
                  name="Name"
                  required
                  fullWidth
                  id="Name"
                  label="Full Name"
                  autoFocus
                  value={Name}
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
                  id="email"
                  label="Email Address"
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </Grid>
              {navigatioBarValue !== 0 ? (
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
              ) : null}
              {navigatioBarValue !== 0 ? (
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="gender"
                    label="gender"
                    id="gender"
                    autoComplete="gender"
                    value={gender}
                    onChange={handlegenderChange}
                  />
                </Grid>
              ) : null}
              {navigatioBarValue !== 0 ? (
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
              ) : null}
              {navigatioBarValue === 2 ? (
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Register For Membership ?
                    </InputLabel>
                    <Select
                      labelId="member"
                      id="member"
                      value={member}
                      label="member"
                      onChange={handleMemberChange}
                    >
                      <MenuItem value={1}>Yes</MenuItem>
                      <MenuItem value={0}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <BottomNavigation
                  showLabels
                  value={navigatioBarValue}
                  onChange={(event, navigatioBarNewValue) => {
                    setnavigatioBarValue(navigatioBarNewValue);
                  }}
                >
                  <BottomNavigationAction
                    label="Owner"
                    icon={
                      <PersonIcon fontSize="large" color="primary">
                        {" "}
                      </PersonIcon>
                    }
                  />
                  <BottomNavigationAction
                    label="Employee"
                    icon={
                      <AssignmentIndSharpIcon fontSize="large" color="primary">
                        {" "}
                      </AssignmentIndSharpIcon>
                    }
                  />
                  <BottomNavigationAction
                    label="Customer"
                    icon={
                      <GroupIcon fontSize="large" color="primary">
                        {" "}
                      </GroupIcon>
                    }
                  />
                </BottomNavigation>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            {/* <Grid container justifyContent="flex-end"> */}
            {/* <Grid item> */}
            <Link href="/" variant="body2">
              Already have an account? Sign in
            </Link>
            {/* </Grid> */}
            {/* </Grid> */}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
