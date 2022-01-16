import { Console } from "console";
import { connection as sql } from "../index.js";

// promise for fetching all transactions of cust given cust id
export const fetchAllTransactionsService = (id) => {
  return new Promise((resolve) => {
    var query = `select * from tran where customer_id = '${id}';`;

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise for fetching all transactions of with payment due
export const fetchAllTransactionsWithDueService = (id) => {
  return new Promise((resolve) => {
    var query = `select * from tran where payment_due = 0;`;

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise for fetching all transactions_view of with payment due
export const fetchAllTransactionsViewService = (id) => {
  return new Promise((resolve) => {
    var query = `select * from simple_tran_customer where customer_id=${id};`;

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise for given transaction id update payment due of transaction
export const updateTransactionPayDueColService = (id) => {
  return new Promise((resolve) => {
    var query = `Update tran SET payment_due=1 where transaction_id='${id}';`;

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise fro fetching all employee transactions given emp name
export const fetchAllTransactionsOfEmpService = (empName) => {
  return new Promise((resolve) => {
    var query = `select * from simple_tran_employee where emp_name='${empName}';`;

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise to fetch * from chnage table
export const fetchAllTransactionsChangedService = () => {
  return new Promise((resolve) => {
    // console.log("==========", query);
    var query = `SELECT * from changes;`;

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise to fetch total gen income
export const fetchTotalIncomeGenService = () => {
  return new Promise((resolve) => {
    var query = `Select sum(t.total) as total from tran as t where t.payment_due = 1;`;
    // console.log("==========", query);

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise to fetch total gen income
export const fetchTotalIncomeGenByAEmpService = (name) => {
  return new Promise((resolve) => {
    // console.log("==========", query);
    var query = `select emp_name, sum(total) as total from simple_tran_employee where t.payment_due = 1 and emp_name= '${name}' group by emp_name;`;

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise to fetch total gen income last month
export const fetchTotalIncomeGenLasMonthService = (name) => {
  return new Promise((resolve) => {
    // console.log("==========", query);
    var query = `call IMS.top_5('income');`;

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise to fetch total gen income from to to
export const fetchTotalIncomeGenFromToToService = (from, to) => {
  return new Promise((resolve) => {
    var query = `Select sum(total) as Total From tran where t.payment_due = 1 and tran_date between '${from}' and '${to}';`;
    // console.log("==========", query);

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise for deleting a transaction given tran id
export const deletTransactionService = (
  empId,
  cusId,
  transactionId,
  curDate,
  productId
) => {
  return new Promise((resolve) => {
    var query = `call IMS.update_transaction('${empId}','${cusId}','${transactionId}', '${curDate}','${productId}');`;
    console.log("==========", query);

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};

// promise for fetching cusLastTranDate
export const cusLastTranDateService = (id) => {
  return new Promise((resolve) => {
    var query = `select max(tran_date) as maxDate from tran where customer_id='${id}';`;
    console.log("==========", query);

    sql.query(query, (err, result) => {
      resolve([err, result]);
    });
  });
};
