import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";

export default function OwnerNavBar() {
  const history = useHistory();

  const employees = () => {
    history.push("/AllEmployees");
  };

  const transactions = () => {
    history.push("/OwnerTransactions");
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
            <Button onClick={employees} color="secondary" variant="contained">
              Employees
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
            <Button
              onClick={transactions}
              color="secondary"
              variant="contained"
            >
              Monitoring
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
