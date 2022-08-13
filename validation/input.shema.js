import joi from 'joi';
export const shcehma =  joi.object({
        name: joi.string().required(),
        dob: joi.date().max(Date.now()).message("Date of birth should be less than todays date").required(),
        city: joi.string().required(),
        credit_score: joi.number().integer().max(900).message("Credit score shoul be less than 900").required(),
        loan_amount: joi.number().integer().min(50000).message("Loan amount should be greater than 50000").max(500000).message("Loan amount should be less than 500000").required()
    });