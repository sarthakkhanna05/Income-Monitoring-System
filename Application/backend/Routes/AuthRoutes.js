import express from "express";
import { clientSignup, SignIn } from "../Controller/AuthController.js";

const router = express.Router();

router.post("/SignUp", clientSignup);
router.post("/SignIn", SignIn);

export default router;
