import bcrypt from "bcrypt";

import {
  getAllProductsService,
  getTopFiveSellingProductsService,
} from "../Services/ProductService.js";

// fetch customer info
export const getAllProducts = async (req, res) => {
  //   console.log("==========Inside Thingy=================");
  try {
    const [err1, result1] = await getAllProductsService();
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);

    if (err1) {
      res.status(400).json({ msg: "Unable to fetch products from database." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res.status(400).json({ msg: "Unable to fetch products from database." });
  }
};

// fetch customer info
export const getTopFiveSellingProducts = async (req, res) => {
  //   console.log("==========Inside Thingy=================");
  try {
    const [err1, result1] = await getTopFiveSellingProductsService();
    // console.log("================err1==============", err1);
    // console.log("================result1==============", result1);

    if (err1) {
      res
        .status(400)
        .json({ msg: "Unable to fetch top five selling products." });
      return;
    }

    res.status(200).json(result1);
  } catch (error) {
    // console.log("================error==============", error);
    res.status(400).json({ msg: "Unable to fetch top five selling products." });
  }
};
