import express from "express";
import {getLoan} from "../controller/loanController.js"
const router = express.Router();

router.post('/get_loan',getLoan)
export default router;