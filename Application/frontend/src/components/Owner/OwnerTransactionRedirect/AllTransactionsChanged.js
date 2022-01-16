import React from "react";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap/Table";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import SERVER_URL from "../../../config/config.js";

function AllTransactionsChanged(props) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // api call to fetch all products
    axios
      .get(SERVER_URL + `/api/transaction/fetchAllTransactionsChanged`)
      .then((response) => {
        // console.log("=========== response==========", response.data);
        if (response.status === 200) {
          setTransactions(response.data);
        }
      })
      .catch((error) => {
        // console.log("=============error=============", error);
        if (error.response.data.msg) {
          alert(error.response.data.msg);
        } else {
          alert("Unable to fetch products from database.");
        }
      });
  }, []);
  return (
    <div>
      <Table striped bordered hover responsive="lg">
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Employee Id</th>
            <th>Change Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr>
              <td>{transaction.transaction_id}</td>
              <td>{transaction.employee_id}</td>
              <td>{transaction.change_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AllTransactionsChanged;
