import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import inputshema from "./validation/input.shema.js";
import joi from "joi";

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.post("/api/get_loan", async(req, res, next)=>{
   try{
    var result = await inputshema.validateInput(req.body);
    res.send("valid success");
   }catch(error){
    res.status(200).json({message: error.message})
   }
    


})
export default app.listen(7000, ()=>{console.log("listening at port 7000")})
