import bcrypt from "bcrypt";

import {
  fetchAllTransactionsService,
  updateTransactionPayDueColService,
  fetchAllTransactionsChangedService,
  fetchAllTransactionsOfEmpService,
  fetchTotalIncomeGenService,
  fetchTotalIncomeGenByAEmpService,
  fetchTotalIncomeGenLasMonthService,
  fetchTotalIncomeGenFromToToService,
  fetchAllTransactionsWithDueService,
  fetchAllTransactionsViewService,
  deletTransactionService,
  cusLastTranDateService,
} from "../Services/TransactionService.js";

// fetch all transactin of a given cust --> cust id
export const fetchAllTransactions = async (req, res) => {
  // console.log("==========Inside Thingy=================");
  const cusId = req.query.id;
  try {
    const [err1, result1] = await fetchAllTransactionsService(cusId);
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);

    if (result1.length === 0) {
      res.status(400).json({ msg: "No transactions available." });
      return;
    }
    if (err1) {
      res
        .status(400)
        .json({ msg: "Unable to fetch customer Transactions from database." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res
      .status(400)
      .json({ msg: "Unable to fetch customer Transactions from database." });
  }
};

// fetch all transactin_view of a given cust --> cust id
export const fetchAllTransactionsView = async (req, res) => {
  const cusId = req.query.id;
  console.log("==========Inside Thingy=================", cusId);
  try {
    const [err1, result1] = await fetchAllTransactionsViewService(cusId);
    console.log("================err1==============", err1);
    console.log("================result1==============", result1);

    if (result1.length === 0) {
      res.status(400).json({ msg: "No transactions available." });
      return;
    }
    if (err1) {
      res
        .status(400)
        .json({ msg: "Unable to fetch customer Transactions from database." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    console.log("================error==============", error);
    res
      .status(400)
      .json({ msg: "Unable to fetch customer Transactions from database." });
  }
};

// given transaction id update payment due of transaction
export const updateTransactionPayDueCol = async (req, res) => {
  // console.log("==========Inside Thingy=================");
  const tranId = req.query.id;
  try {
    const [err1, result1] = await updateTransactionPayDueColService(tranId);
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);
    if (err1) {
      res.status(400).json({ msg: "Unable to update transaction." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res.status(400).json({ msg: "Unable to update transaction." });
  }
};

// fetch All Transactions that are changed
export const fetchAllTransactionsChanged = async (req, res) => {
  // console.log("==========Inside Thingy=================");
  const tranId = req.query.id;
  try {
    const [err1, result1] = await fetchAllTransactionsChangedService(tranId);
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);
    if (err1) {
      res.status(400).json({ msg: "Unable to update transaction." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res.status(400).json({ msg: "Unable to update transaction." });
  }
};

// fetch All Transactions of emp given emp name
export const fetchAllTransactionsOfEmp = async (req, res) => {
  // console.log("==========Inside Thingy=================");
  try {
    const [err1, result1] = await fetchAllTransactionsOfEmpService(
      req.query.name
    );
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);
    if (err1) {
      res.status(400).json({ msg: "Unable to fetch Transaction." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res.status(400).json({ msg: "Unable to fetch Transaction." });
  }
};

// fetch total income generated
export const fetchTotalIncomeGen = async (req, res) => {
  // console.log("==========Inside Thingy=================");
  try {
    const [err1, result1] = await fetchTotalIncomeGenService();
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);
    if (err1) {
      res.status(400).json({ msg: "Unable to fetch Total Generated Income." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res.status(400).json({ msg: "Unable to fetch Total Generated Income." });
  }
};

// fetch total income generated by employee
export const fetchTotalIncomeGenByAEmp = async (req, res) => {
  // console.log("==========Inside Thingy=================");
  try {
    const [err1, result1] = await fetchTotalIncomeGenByAEmpService(
      req.query.name
    );
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);
    if (err1) {
      res
        .status(400)
        .json({ msg: "Unable to fetch Total Income Generated by Employee." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res
      .status(400)
      .json({ msg: "Unable to fetch Total Income Generated by Employee." });
  }
};

// fetch total income generated last month
export const fetchTotalIncomeGenLasMonth = async (req, res) => {
  // console.log("==========Inside Thingy=================");
  try {
    const [err1, result1] = await fetchTotalIncomeGenLasMonthService(
      req.query.name
    );
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);
    if (err1) {
      res
        .status(400)
        .json({ msg: "Unable to fetch Total Income Generated Last Month." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res
      .status(400)
      .json({ msg: "Unable to fetch Total Income Generated Last Month." });
  }
};

// fetch total income generated from to to
export const fetchTotalIncomeGenFromToTo = async (req, res) => {
  // console.log("==========Inside Thingy=================");
  try {
    const [err1, result1] = await fetchTotalIncomeGenFromToToService(
      req.query.from,
      req.query.to
    );
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);
    if (err1) {
      res
        .status(400)
        .json({ msg: "Unable to fetch Total Income Generated Last Month." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res
      .status(400)
      .json({ msg: "Unable to fetch Total Income Generated Last Month." });
  }
};

// fetch total income generated from to to
export const fetchAllTransactionsWithDue = async (req, res) => {
  // console.log("==========Inside Thingy=================");
  try {
    const [err1, result1] = await fetchAllTransactionsWithDueService();
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);
    if (err1) {
      res
        .status(400)
        .json({ msg: "Unable to fetch Transaction with due payments." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res
      .status(400)
      .json({ msg: "Unable to fetch Transaction with due payments." });
  }
};

// delte a transaction given tran in
export const deletTransaction = async (req, res) => {
  console.log("==========Inside Thingy=================", req.body);

  try {
    const [err1, result1] = await deletTransactionService(
      req.body.empId,
      req.body.cusId,
      req.body.transactionId,
      req.body.curDate,
      req.body.productId
    );
    console.log("================err1==============", err1);
    console.log("================result1==============", result1);
    if (err1) {
      res.status(400).json({ msg: "Unable to delete this Transaction." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    console.log("================error==============", error);
    res.status(400).json({ msg: "Unable to delete this Transaction." });
  }
};

// cusLastTranDate given cust id
export const cusLastTranDate = async (req, res) => {
  console.log("==========Inside Thingy=================", req.query.id);

  try {
    const [err1, result1] = await cusLastTranDateService(req.query.id);
    console.log("================err1==============", err1);
    console.log("================result1==============", result1);
    if (err1) {
      res
        .status(400)
        .json({ msg: "Unable to fetch Customer last transaction Date." });
      return;
    }

    if (result1.maxDate === null) {
      res.status(200).json([
        {
          maxDate: "111",
        },
      ]);
    }

    res.status(200).json(result1);
  } catch (error) {
    console.log("================error==============", error);
    res
      .status(400)
      .json({ msg: "Unable to fetch Customer last transaction Date." });
  }
};
