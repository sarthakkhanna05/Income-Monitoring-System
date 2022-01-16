import EmployeeSales from "../Models/EmployeeSalesModel.js";
import {
  getEmpInfoService,
  updateEmpInfoService,
  getAllEmployeesService,
  fireEmployeeService,
  addTransactionService,
  getAllEmployeesFromToService,
  getEmployeesWithHighSaleLasMonService,
  sendMessageToEmployeeService,
  getEmployeeMessageService,
  getAllEmployeeSalesService,
} from "../Services/EmployeeService.js";

// fetch employee info
export const getEmpInfo = async (req, res) => {
  //   console.log("==========Inside Thingy=================");
  const emp_id = req.query.id;
  try {
    const [err1, result1] = await getEmpInfoService(emp_id);
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);

    if (err1) {
      res
        .status(400)
        .json({ msg: "Unable to fetch employee information from database." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res
      .status(400)
      .json({ msg: "Unable to fetch employee information from database." });
  }
};

// update employee info
export const updateEmpInfo = async (req, res) => {
  //   console.log("==========Inside Thingy=================");
  //   console.log(
  //     "==========Inside Thingy=================",
  //     req.body.id,
  //     req.body.name,
  //     req.body.email,
  //     req.body.address
  //   );

  try {
    const [err1, result1] = await updateEmpInfoService(
      req.body.id,
      req.body.name,
      req.body.contactNumber,
      req.body.address
    );
    // console.log("================err1==============", err1);
    // console.log("================result1 of update==============", result1);

    if (err1) {
      res
        .status(400)
        .json({ msg: "Unable to update employee information in database." });
      return;
    }

    // let insertId = result1.body.

    const [err2, result2] = await getEmpInfoService(req.body.id);
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);

    if (err2) {
      res.status(400).json({
        msg: "Unable to fetch updated employee information from database.",
      });
      return;
    }

    res.status(200).json(result2);
  } catch (error) {
    // console.log("================error  1==============", error);
    res
      .status(400)
      .json({ msg: "Unable to update employee information in database." });
  }
};

// fetch all employees
export const getAllEmployees = async (req, res) => {
  //   console.log("==========Inside Thingy=================");
  //   console.log(
  //     "==========Inside Thingy=================",
  //     req.body.id,
  //     req.body.name,
  //     req.body.email,
  //     req.body.address
  //   );

  try {
    const [err1, result1] = await getAllEmployeesService();
    // console.log("================err1==============", err1);
    // console.log("================result1 of update==============", result1);

    if (err1) {
      res.status(400).json({ msg: "Unable to fetch employees from database." });
      return;
    }

    if (result1.length === 0) {
      res.status(400).json({ msg: "No employees to fetch." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error  1==============", error);
    res.status(400).json({ msg: "Unable to fetch employees from database." });
  }
};

// fetch all employees from to to
export const getAllEmployeesFromTo = async (req, res) => {
  //   console.log("==========Inside Thingy=================");
  //   console.log(
  //     "==========Inside Thingy=================",
  //     req.body.id,
  //     req.body.name,
  //     req.body.email,
  //     req.body.address
  //   );

  try {
    const [err1, result1] = await getAllEmployeesFromToService(
      req.query.from,
      req.query.to
    );
    console.log("================err1==============", err1);
    console.log("================result1 of update==============", result1);

    if (err1) {
      res.status(400).json({ msg: "Unable to fetch employees from database." });
      return;
    }

    if (result1.length === 0) {
      res.status(400).json({ msg: "No employees to fetch." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    console.log("================error  1==============", error);
    res.status(400).json({ msg: "Unable to fetch employees from database." });
  }
};

// fetch all employees with highest sale
export const getEmployeesWithHighSaleLasMon = async (req, res) => {
  //   console.log("==========Inside Thingy=================");
  //   console.log(
  //     "==========Inside Thingy=================",
  //     req.body.id,
  //     req.body.name,
  //     req.body.email,
  //     req.body.address
  //   );

  try {
    const [err1, result1] = await getEmployeesWithHighSaleLasMonService();
    console.log("================err1==============", err1);
    console.log("================result1 of update==============", result1);

    if (err1) {
      res.status(400).json({ msg: "Unable to fetch employees from database." });
      return;
    }

    if (result1.length === 0) {
      res.status(400).json({ msg: "No employees to fetch." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    console.log("================error  1==============", error);
    res.status(400).json({ msg: "Unable to fetch employees from database." });
  }
};

// delete employee given employee id
export const fireEmployee = async (req, res) => {
  //   console.log("==========Inside Thingy=================");

  var empId = req.query.id;

  try {
    const [err1, result1] = await fireEmployeeService(empId);
    // console.log("================err1==============", err1);
    // console.log("================result1 of update==============", result1);

    if (err1) {
      res.status(400).json({ msg: "Unable to fire employee." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error  1==============", error);
    res.status(400).json({ msg: "Unable to fire employee." });
  }
};

// employee makes a transaction for customer
export const addTransaction = async (req, res) => {
  console.log(
    "=========All=================",
    req.body.products,
    req.body.cusId,
    req.body.empId,
    req.body.date,
    req.body.qty,
    req.body.payDue,
    req.body.discount
  );
  console.log("==========Inside Thingy=================", req.body.products);

  // converting product ids to comma sapareted string
  var productIdsString = "";
  req.body.products.forEach((product) => {
    productIdsString = productIdsString + `${product.productId},`;
  });

  productIdsString = productIdsString.slice(0, -1);

  console.log("==========Inside Thingy=================", productIdsString);

  try {
    const [err1, result1] = await addTransactionService(
      productIdsString,
      req.body.cusId,
      req.body.empId,
      req.body.date,
      req.body.qty,
      req.body.payDue,
      req.body.discount
    );
    console.log("================err1==============", err1);
    console.log("================result1 of update==============", result1);

    if (err1) {
      res.status(400).json({ msg: "Unable to create transaction." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    console.log("================error catch==============", error);
    res.status(400).json({ msg: "Unable to create transaction." });
  }
};

// delete employee given employee id
export const sendMessageToEmployee = async (req, res) => {
  //   console.log("==========Inside Thingy=================");

  console.log(req.body.message, req.body.empIds);

  try {
    const [err1, result1] = await sendMessageToEmployeeService(
      req.body.message,
      req.body.empIds
    );
    // console.log("================err1==============", err1);
    // console.log("================result1 of update==============", result1);

    if (err1) {
      res.status(400).json({ msg: "Unable to Send Message to Employee." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error  1==============", error);
    res.status(400).json({ msg: "Unable to Send Message to Employee." });
  }
};

//given employee id get message
export const getEmployeeMessage = async (req, res) => {
  //   console.log("==========Inside Thingy=================");

  try {
    const [err1, result1] = await getEmployeeMessageService(req.query.id);
    // console.log("================err1==============", err1);
    // console.log("================result1 of update==============", result1);

    if (err1) {
      res.status(400).json({ msg: "Unable to fetch employee message." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error  1==============", error);
    res.status(400).json({ msg: "Unable to fetch employee message." });
  }
};

// takes a month year string finds all emp sales in Mongo that month
// if finds display else fetch data frpm mySql fill in Mongo and display (format of month_year feb 2021 --> "022021")
export const getAllEmployeeSales = async (req, res) => {
  console.log("==========Inside Thingy=================", req.body);
  var month = req.body.month;
  var year = req.body.year;

  var month_year = month + year;

  var start_date = year + "-" + month + "-" + "01";
  var end_date = year + "-" + month + "-" + "30";

  var emp_names = [];
  var total_sales = [];

  console.log(
    "==========Inside Thingy=================",
    month,
    year,
    month_year,
    start_date,
    end_date
  );

  try {
    // fetch from mongo
    var employeeSales = await EmployeeSales.find({ month_year: month_year });

    console.log("================employeeSales==============", employeeSales);

    if (employeeSales.length > 0) {
      res.status(200).json(employeeSales);
      return;
    } else {
      // fetch from my sql and add to mongo
      const [err1, result1] = await getAllEmployeeSalesService(
        start_date,
        end_date
      );

      if (err1) {
        res.status(400).json({ msg: "Unable to fetch employee message." });
        return;
      }
      console.log("================err1==============", err1);
      console.log("================result1==============", result1);

      result1.forEach((obj) => {
        emp_names.push(obj.emp_name);
        total_sales.push(obj.total);
      });

      console.log(
        "================Arrays==============",
        emp_names,
        total_sales
      );

      employeeSales = new EmployeeSales({
        month_year,
        emp_names,
        total_sales,
      });

      const savedEmployeeSales = await employeeSales.save();

      res.status(200).json(savedEmployeeSales);
    }
  } catch (error) {
    console.log("================error  1==============", error);
    res
      .status(400)
      .json({ msg: "Unable to fetch employee sales Data fromdatabase." });
  }
};
