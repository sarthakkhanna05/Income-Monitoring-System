import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useHistory } from "react-router";
import { useEffect } from "react";
import SERVER_URL from "../../../config/config.js";
import { useState } from "react";
import Table from "react-bootstrap/Table";

function PushToTopFiveSellingProducts(props) {
  //   console.log(
  //     "===================",
  //     props.location.state.startDate,
  //     props.location.state.endDate
  //   );
  let history = useHistory();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // api call to fetch all employees
    axios
      .get(SERVER_URL + `/api/product/getTopFiveSellingProducts`)
      .then((response) => {
        // console.log("=========== response==========", response.data);
        if (response.status === 200) {
          setProducts(response.data[0]); // might need to save in LS
          console.log(response.data[0]);
        }
      })
      .catch((error) => {
        // console.log("=============error=============", error);
        if (error.response.data.msg) {
          alert(error.response.data.msg);
        } else {
          alert("Unable to fetch employees from database.");
        }
      });
  }, []);
  return (
    <div>
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Count</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr>
              <td>{product.product_name}</td>
              <td>{product.Count}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PushToTopFiveSellingProducts;
