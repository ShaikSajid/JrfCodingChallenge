import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import inputshema from "./validation/input.shema.js";

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.post("/api/get_loan", async (req, res, next) => {
    const cities = [{ name: "Bengaluru", type: "Tier1" }, { name: "Mumbai", type: "Tier1" },
    { name: "Delhi", type: "Tier1" }, { name: "Chennai", type: "Tier1" }, { name: "Hyderabad", type: "Tier1"},
    { name: "Mysore", type: "Tier2" }, { name: "Hubli", type: "Tier2" },
    { name: "Dharwad", type: "Tier2" }, { name: "Belgaum", type: "Tier2" }, { name: "Shimoga", type: "Tier2" }];
    
    const creditScoreCriteria = [
        { minCredit: 300, maxCredit: 500, cityType: "Tier1", rateOfInterest: 14 },
        { minCredit: 501, maxCredit: 700, cityType: "Tier1", rateOfInterest: 12 },
        { minCredit: 501, maxCredit: 700, cityType: "Tier2", rateOfInterest: 13 },
        { minCredit: 701, maxCredit: 800, cityType: "Tier1", rateOfInterest: 12 },
        { minCredit: 701, maxCredit: 800, cityType: "Tier2", rateOfInterest: 13 },
        { minCredit: 801, maxCredit: 900, cityType: "Tier1", rateOfInterest: 10 },
        { minCredit: 801, maxCredit: 900, cityType: "Tier2", rateOfInterest: 11 }
    ];
    const tenureMonths = 12 ;
    try {
        const loanTenure = 1;
        let loanObject = {};
        let loanArr = [];
        var result = await inputshema.validateInput(req.body);
        const {name, dob, city, credit_score, loan_amount} = req.body;
        const age = getAge(dob);
        let month=1;
        const findCity = cities.find(({name}) => name === req.body.city);
        const creditScore = creditScoreCriteria.find(({minCredit,maxCredit,cityType})=> (minCredit <= credit_score && maxCredit >= credit_score) && cityType === findCity.type);
        if (age < 18 || age + loanTenure > 60 || credit_score < 300 || (credit_score < 500 && findCity.type ==="Tier2")) {
            res.status(400).send({ message: "Application Rejected" });
        }
        else {
            let principal = 0;
            let loanAmount = loan_amount;
            for (let i = 12 ; i > 0; --i)
            {
                let loanObject = {};
                loanAmount = loanAmount -principal;
                 principal = loanAmount / i;
                let interest = (creditScore.rateOfInterest * loan_amount) / tenureMonths ;
                loanObject.Principal = Math.ceil(principal);
                loanObject.Interest = Math.ceil(interest);
                var now = new Date();
                var current = new Date(now.getFullYear(), now.getMonth()+month, 1);
                loanObject.EMIDate = convertDate(current);
                current;
                loanArr.push(loanObject);
                month++;
            }
            var finalObjet={};
            finalObjet.RateOfInterest=creditScore.rateOfInterest +"%";
            finalObjet.ApplicationStaus= "Approve";
            finalObjet.Schedule = loanArr;
            res.status(200).send(finalObjet);
        }


    } catch (error) {
        res.status(200).json({ message: error.message })
    }



})
export default app.listen(7000, () => { console.log("listening at port 7000") })

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }