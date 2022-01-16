import express from "express";
import {
  fetchAllTransactions,
  updateTransactionPayDueCol,
  fetchAllTransactionsChanged,
  fetchAllTransactionsOfEmp,
  fetchTotalIncomeGen,
  fetchTotalIncomeGenByAEmp,
  fetchTotalIncomeGenLasMonth,
  fetchTotalIncomeGenFromToTo,
  fetchAllTransactionsWithDue,
  fetchAllTransactionsView,
  deletTransaction,
  cusLastTranDate,
} from "../Controller/TransactionController.js";

const router = express.Router();

router.get("/fetchAllTransactions", fetchAllTransactions); // fetch all transactions of a cust given cust id
router.get("/fetchAllTransactionsView", fetchAllTransactionsView); // fetch all transactions_views of a cust given cust id
router.get("/fetchAllTransactionsWithDue", fetchAllTransactionsWithDue);
router.get("/fetchAllTransactionsOfEmp", fetchAllTransactionsOfEmp); // fetch all transactions of a emp given emp name
router.put("/updateTransactionPayDueCol", updateTransactionPayDueCol); // given transaction id update payment due of transaction
router.get("/fetchAllTransactionsChanged", fetchAllTransactionsChanged);
router.get("/fetchTotalIncomeGen", fetchTotalIncomeGen);
router.get("/fetchTotalIncomeGenLasMonth", fetchTotalIncomeGenLasMonth);
router.get("/fetchTotalIncomeGenFromToTo", fetchTotalIncomeGenFromToTo);
router.get("/fetchTotalIncomeGenByAEmp", fetchTotalIncomeGenByAEmp);
router.post("/deletTransaction", deletTransaction); // dlt a transaction given transaction id
router.get("/cusLastTranDate", cusLastTranDate); // cust last tran date given cust id

export default router;
