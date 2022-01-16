import express from "express";
import {
  getAllProducts,
  getTopFiveSellingProducts,
} from "../Controller/ProductController.js";

const router = express.Router();

router.get("/getAllProducts", getAllProducts);
router.get("/getTopFiveSellingProducts", getTopFiveSellingProducts);

export default router;
