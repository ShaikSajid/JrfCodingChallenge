import {shcehma} from "../validation/input.shema.js";
import {cities,creditScoreCriteria,getSchedule,loanTenure,getAge,convertDate} from "../util/loanUtils.js"


export const getLoan =  (req, res, next) => {
    try {
        let {value, error} = shcehma.validate(req.body);
        if(error){
            res.status(400).json({ message: error.message });
        }
        else{
        const {name, dob, city, credit_score, loan_amount} = req.body;
        const age = getAge(dob);
        const findCity = cities.find(({name}) => name === req.body.city);
        const creditScore = creditScoreCriteria.find(({minCredit,maxCredit,cityType})=> (minCredit <= credit_score && maxCredit >= credit_score) && cityType === findCity.type);
        if (age < 18 || age + loanTenure > 60 || credit_score < 301 || (credit_score < 501 && findCity.type ==="Tier2")) {
            res.status(400).send({ message: "Application Rejected" });
        }
        else {
            
            res.status(200).send(getSchedule(creditScore , loan_amount));
        }

    }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }



};


