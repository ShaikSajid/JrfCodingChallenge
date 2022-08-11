import chai from 'chai'
import server from "../index.js"
import chaiHttp from 'chai-http'

//Assertion
chai.should();
chai.use(chaiHttp);
describe('Loan API', () =>{

    /**
     * Test the POST route
     */
    describe("POST /api/get_loan", () => {
        
        /**
         * validation for name 
         */
        it("It should retun validation error for empty name input", (done) => {
            const loanIput = {
                name: "",
                dob: "2000-08-12",
                city: "Bengluru",
                credit_score: 900,
                loan_amount: 600000
            };
            chai.request(server)                
                .post("/api/get_loan")
                .send(loanIput)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property("message");
                    response.body.should.have.property("message").eq("\"name\" is not allowed to be empty");
                done();
                });
        });

        /**
         * Date of birth validation 
         */

        it("It should retun validation error for invalid date of birth", (done) => {
            const loanIput = {
                name: "john",
                dob: "2022-08-12",
                city: "Bengluru",
                credit_score: 900,
                loan_amount: 600000
            };
            chai.request(server)                
                .post("/api/get_loan")
                .send(loanIput)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property("message");
                    response.body.should.have.property("message").eq("Date of birth should be less than todays date");
                done();
                });
        });

        /**
         * Validation for credit score
         */
        it("It should retun validation error for invalid credit score", (done) => {
            const loanIput = {
                name: "john",
                dob: "2000-08-12",
                city: "Bengluru",
                credit_score: 1000,
                loan_amount: 600000
            };
            chai.request(server)                
                .post("/api/get_loan")
                .send(loanIput)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property("message");
                    response.body.should.have.property("message").eq("Credit score shoul be less than 900");
                done();
                });
                
        });

                /**
                 * validation for minimum loan amount 
                 */
                it("It should retun validation error for invalid minnimum loan amount", (done) => {
                    const loanIput = {
                        name: "john",
                        dob: "2000-08-12",
                        city: "Bengluru",
                        credit_score: 900,
                        loan_amount: 40000
                    };
                    chai.request(server)                
                        .post("/api/get_loan")
                        .send(loanIput)
                        .end((err, response) => {
                            response.should.have.status(200);
                            response.body.should.be.a('object');
                            response.body.should.have.property("message");
                            response.body.should.have.property("message").eq("Loan amount should be greater than 50000");
                        done();
                        });
                        
                });

                /**
                 * validation for maximum loan amount 
                 */

                it("It should retun validation error for invalid minnimum loan amount", (done) => {
                    const loanIput = {
                        name: "john",
                        dob: "2000-08-12",
                        city: "Bengluru",
                        credit_score: 900,
                        loan_amount: 600000
                    };
                    chai.request(server)                
                        .post("/api/get_loan")
                        .send(loanIput)
                        .end((err, response) => {
                            response.should.have.status(200);
                            response.body.should.be.a('object');
                            response.body.should.have.property("message");
                            response.body.should.have.property("message").eq("Loan amount should be less than 500000");
                        done();
                        });
                        
                });

    });
})