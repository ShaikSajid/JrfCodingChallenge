import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from './router/loanRouter.js';
const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use("/api",router);
export default app.listen(7000, () => { console.log("listening at port 7000") });