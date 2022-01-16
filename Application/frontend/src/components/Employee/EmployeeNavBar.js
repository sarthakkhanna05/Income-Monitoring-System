import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export default function EmployeeNavBar() {
  const history = useHistory();

  const updateProfile = () => {
    history.push("/UpdateEmpProfile");
  };

  const products = () => {
    history.push("/EmpProducts");
  };

  const messages = () => {
    history.push("/EmpMessagesFromOwner");
  };

  const customers = () => {
    history.push("/EmployeeToCustomers");
  };

  const transactions = () => {
    history.push("/EmpTransactions");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* <Link
              style={{ textDecoration: "none", color: "black" }}
              id="tocustprofile"
              className="nav-link"
              to="/UpdateCustProfile"
            >
              {" "}
              Update Profile
            </Link> */}
            <Button onClick={updateProfile} color="success" variant="contained">
              Update Profile
            </Button>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button onClick={messages} color="secondary" variant="contained">
              Messages
            </Button>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button onClick={products} color="warning" variant="contained">
              Create Order
            </Button>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button onClick={customers} color="secondary" variant="contained">
              Show All Customers
            </Button>
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {/* <Link
              style={{ textDecoration: "none", color: "black" }}
              id="tocustprofile"
              className="nav-link"
              to="/custProfile"
            >
              {" "}
              Payment
            </Link> */}
            <Button onClick={transactions} color="success" variant="contained">
              Update Orders
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
