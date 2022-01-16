import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import SERVER_URL from "../../config/config.js";
import { useHistory } from "react-router";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import AssignmentIndSharpIcon from "@mui/icons-material/AssignmentIndSharp";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";

const theme = createTheme();

export default function SignIn() {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigatioBarValue, setnavigatioBarValue] = useState(0);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // console.log(email, password, navigatioBarValue);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console

    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });

    const data = {
      email: email,
      password: password,
      persona: navigatioBarValue,
    };

    axios
      .post(SERVER_URL + "/api/auth/SignIn", data)
      .then((response) => {
        console.log("===========response==========", response.data.result);
        if (response.status === 200) {
          if (data.persona === 0) {
            history.push("/Owner");
          } else if (data.persona === 1) {
            history.push("/Employee");
          } else if (data.persona === 2) {
            history.push("/Customer");
          }
          localStorage.setItem(
            "userData",
            JSON.stringify(response.data.result)
          );
        }
      })
      .catch((error) => {
        console.log("=============error=============", error);
        if (error.response.data.msg) {
          alert(error.response.data.msg);
        } else {
          alert("Error occured while signing in");
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleEmailChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handlePasswordChange}
            />
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
