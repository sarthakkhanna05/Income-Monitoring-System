import { Console } from "console";
import { connection as sql } from "../index.js";

// promise for fetching userProfile profile info
export const getCusInfoService = (id) => {
  return new Promise((resolve) => {
    var query = `select cus_name, contact_no, address from customer where customer_id=${id}`;

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise for updating userProfile profile info
export const updateCusInfoService = (id, name, contactNumber, adress) => {
  return new Promise((resolve) => {
    var query = `UPDATE customer SET cus_name = '${name}', contact_no = '${contactNumber}', address='${adress}' WHERE customer_id = '${id}';`;

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise for deleting userProfile info
export const deleteCusInfoService = (id) => {
  return new Promise((resolve) => {
    var query = `DELETE FROM customer WHERE customer_id = '${id}';`;

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise for fetching cust id given cust email
export const getCustIdGivenEmailService = (cus_email) => {
  return new Promise((resolve) => {
    var query = `select customer_id from customer WHERE email = '${cus_email}';`;

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise for fetching top 5 cust with highest purchases
export const getFiveCusHighPurFromToService = (from, to) => {
  return new Promise((resolve) => {
    var query = `SELECT c.cus_name, sum(t.total) as Total
    from customer as c, tran as t
    where t.payment_due = 1 and c.customer_id=t.customer_id and t.tran_date between '${from}' and '${to}'
    group by c.cus_name
    order by sum(t.total) DESC
    LIMIT 5;`;
    // console.log("=====================", query);

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise for fetching top 5 cust with highest purchases last month
export const getFiveCusHighPurLasMonService = () => {
  return new Promise((resolve) => {
    var query = `call IMS.top_5('customer');`;
    // console.log("=====================", query);

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise for fetching membership status of cust
export const getMembershipStatusService = (id) => {
  return new Promise((resolve) => {
    var query = `select membership from customer where customer_id='${id}';`;
    // console.log("=====================", query);

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise for fetching all customers
export const getAllCustomersService = (id) => {
  return new Promise((resolve) => {
    var query = `SELECT * FROM IMS.simple_tran_customer;`;
    // console.log("=====================", query);

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};
