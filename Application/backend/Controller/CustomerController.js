import bcrypt from "bcrypt";

import {
  getCusInfoService,
  updateCusInfoService,
  deleteCusInfoService,
  getCustIdGivenEmailService,
  getFiveCusHighPurFromToService,
  getFiveCusHighPurLasMonService,
  getMembershipStatusService,
  getAllCustomersService,
} from "../Services/CustomerService.js";

// fetch customer info
export const getCusInfo = async (req, res) => {
  //   console.log("==========Inside Thingy=================");
  const cus_id = req.query.id;
  try {
    const [err1, result1] = await getCusInfoService(cus_id);
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);

    if (err1) {
      res
        .status(400)
        .json({ msg: "Unable to fetch customer information from database." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res
      .status(400)
      .json({ msg: "Unable to fetch customer information from database." });
  }
};

// update customer info
export const updateCusInfo = async (req, res) => {
  //   console.log("==========Inside Thingy=================");
  //   console.log(
  //     "==========Inside Thingy=================",
  //     req.body.id,
  //     req.body.name,
  //     req.body.email,
  //     req.body.address
  //   );

  try {
    const [err1, result1] = await updateCusInfoService(
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
        .json({ msg: "Unable to update customer information in database." });
      return;
    }

    // let insertId = result1.body.

    const [err2, result2] = await getCusInfoService(req.body.id);
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);

    if (err2) {
      res.status(400).json({
        msg: "Unable to fetch updated customer information from database.",
      });
      return;
    }

    res.status(200).json(result2);
  } catch (error) {
    // console.log("================error  1==============", error);
    res
      .status(400)
      .json({ msg: "Unable to update customer information in database." });
  }
};

// delete customer info
export const deleteCusInfo = async (req, res) => {
  // console.log("==========Inside Thingy=================");
  // console.log("==========Inside Thingy=================", req.query.id);

  try {
    const [err1, result1] = await deleteCusInfoService(req.query.id);
    // console.log("================err1==============", err1);
    // console.log("================result1 of update==============", result1);

    if (err1) {
      res
        .status(400)
        .json({ msg: "Unable to delete customer information from database." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error  1==============", error);
    res
      .status(400)
      .json({ msg: "Unable to delete customer information from database." });
  }
};

// fetch cust id given cust email
export const getCustIdGivenEmail = async (req, res) => {
  console.log("==========Inside Thingy=================");
  const cus_email = req.query.email;
  try {
    const [err1, result1] = await getCustIdGivenEmailService(cus_email);
    console.log("================err1==============", err1);
    console.log("================result1==============", result1);

    if (result1.length === 0) {
      res.status(400).json({ msg: "Invalid Email For Customer." });
      return;
    }
    if (err1) {
      res
        .status(400)
        .json({ msg: "Unable to fetch customer information from database." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res
      .status(400)
      .json({ msg: "Unable to fetch customer information from database." });
  }
};

// fetch to cus with hisghest pur
export const getFiveCusHighPurFromTo = async (req, res) => {
  // console.log("==========Inside Thingy=================");

  try {
    const [err1, result1] = await getFiveCusHighPurFromToService(
      req.query.from,
      req.query.to
    );
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);

    if (result1.length === 0) {
      res.status(400).json({ msg: "No Customers to Fetch." });
      return;
    }
    if (err1) {
      res
        .status(400)
        .json({ msg: "Unable to fetch customer information from database." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res
      .status(400)
      .json({ msg: "Unable to fetch customer information from database." });
  }
};

// fetch to cus with hisghest pur last mon
export const getFiveCusHighPurLasMon = async (req, res) => {
  // console.log("==========Inside Thingy=================");

  try {
    const [err1, result1] = await getFiveCusHighPurLasMonService();
    // console.log("================err1==============", err1);
    console.log("================result1==============", result1);

    if (result1.length === 0) {
      res.status(400).json({ msg: "No Customers to Fetch." });
      return;
    }
    if (err1) {
      res
        .status(400)
        .json({ msg: "Unable to fetch customer information from database." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res
      .status(400)
      .json({ msg: "Unable to fetch customer information from database." });
  }
};

// fetch to cus with hisghest pur last mon
export const getMembershipStatus = async (req, res) => {
  // console.log("==========Inside Thingy=================");

  try {
    const [err1, result1] = await getMembershipStatusService(req.query.id);
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);

    if (err1) {
      res
        .status(400)
        .json({ msg: "Unable to fetch customer Membership Status." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res
      .status(400)
      .json({ msg: "Unable to fetch customer Membership Status." });
  }
};

// fetch all custs
export const getAllCustomers = async (req, res) => {
  // console.log("==========Inside Thingy=================");

  try {
    const [err1, result1] = await getAllCustomersService(req.query.id);
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);

    if (err1) {
      res.status(400).json({ msg: "Unable to fetch Customers from database." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res.status(400).json({ msg: "Unable to fetch Customers from database." });
  }
};
