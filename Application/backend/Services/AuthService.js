import { Console } from "console";
import { connection as sql } from "../index.js";

// promise for fetching userProfile profile info
export const addToDbPromise = (
  name,
  contact_no,
  gender,
  email,
  address,
  password,
  persona,
  member
) => {
  return new Promise((resolve) => {
    var query = "";
    if (persona === 0) {
      query = `insert into company_owner (owner_name, owner_pwd, email) values('${name}','${password}', '${email}');`;
    } else if (persona === 1) {
      query = `insert into employee (emp_name, contact_no, gender, email, address, emp_password) values('${name}','${contact_no}', '${gender}', '${email}', '${address}', '${password}');`;
    } else if (persona === 2) {
      query = `insert into customer (cus_name, contact_no, gender, email, address, cus_password, membership) values('${name}','${contact_no}', '${gender}', '${email}', '${address}', '${password}', '${member}');`;
    }
    console.log(query);
    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// query for fetching email from customer, owner or employee
export const getCredsPromise = (persona, email) => {
  return new Promise((resolve) => {
    var query = "";
    if (persona === 0) {
      query = `select * from company_owner where email='${email}'; `;
    } else if (persona === 1) {
      query = `select * from employee where email='${email}'; `;
    } else if (persona === 2) {
      query = `select * from customer where email='${email}'; `;
    }

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise for fetching userProfile info based on id
export const getPorfilePromise = (persona, id) => {
  return new Promise((resolve) => {
    var query = "";
    if (persona === 0) {
      query = `select * from company_owner where owner_id='${id}'; `;
    } else if (persona === 1) {
      query = `select * from employee where employee_id='${id}'; `;
    } else if (persona === 2) {
      query = `select * from customer where customer_id='${id}'; `;
    }

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise for fetching userProfile info based on email
export const getPorfilePromiseSignIn = (persona, email) => {
  return new Promise((resolve) => {
    var query = "";
    if (persona === 0) {
      query = `select * from company_owner where email='${email}'; `;
    } else if (persona === 1) {
      query = `select * from employee where email='${email}'; `;
    } else if (persona === 2) {
      query = `select * from customer where email='${email}'; `;
    }

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};
