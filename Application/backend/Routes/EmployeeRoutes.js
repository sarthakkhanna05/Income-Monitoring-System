import express from "express";
import {
  getEmpInfo,
  updateEmpInfo,
  getAllEmployees,
  fireEmployee,
  addTransaction,
  getAllEmployeesFromTo,
  getEmployeesWithHighSaleLasMon,
  sendMessageToEmployee,
  getEmployeeMessage,
  getAllEmployeeSales,
} from "../Controller/EmployeeController.js";

const router = express.Router();

router.get("/getEmpInfo", getEmpInfo);
router.put("/updateEmpInfo", updateEmpInfo);
router.get("/getAllEmployees", getAllEmployees);
router.get("/getAllEmployeesFromTo", getAllEmployeesFromTo);
router.get("/getEmployeesWithHighSaleLasMon", getEmployeesWithHighSaleLasMon);
router.delete("/fireEmployee", fireEmployee); // given employee id dlete emp from emp table
router.post("/addTransaction", addTransaction); // employee makes a transaction for customer
router.put("/sendMessageToEmployee", sendMessageToEmployee);
router.get("/getEmployeeMessage", getEmployeeMessage); // given emplouyee id fetch messgae
router.post("/getAllEmployeeSales", getAllEmployeeSales); // takes a month year string finds all emp sales in Mongo that month if finds display else fetch data frpm mySql fill in Mongo and display

export default router;
