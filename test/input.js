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
                city: "Bengaluru",
                credit_score: 900,
                loan_amount: 600000
            };
            chai.request(server)                
                .post("/api/get_loan")
                .send(loanIput)
                .end((err, response) => {
                    response.should.have.status(400);
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
                dob: "2022-09-31",
                city: "Bengaluru",
                credit_score: 900,
                loan_amount: 500000
            };
            chai.request(server)                
                .post("/api/get_loan")
                .send(loanIput)
                .end((err, response) => {
                    response.should.have.status(400);
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
                city: "Bengaluru",
                credit_score: 1000,
                loan_amount: 600000
            };
            chai.request(server)                
                .post("/api/get_loan")
                .send(loanIput)
                .end((err, response) => {
                    response.should.have.status(400);
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
                        city: "Bengaluru",
                        credit_score: 900,
                        loan_amount: 40000
                    };
                    chai.request(server)                
                        .post("/api/get_loan")
                        .send(loanIput)
                        .end((err, response) => {
                            response.should.have.status(400);
                            response.body.should.be.a('object');
                            response.body.should.have.property("message");
                            response.body.should.have.property("message").eq("Loan amount should be greater than 50000");
                        done();
                        });
                        
                });

                /**
                 * validation for maximum loan amount 
                 */

                it("It should retun validation error for invalid maximum loan amount", (done) => {
                    const loanIput = {
                        name: "john",
                        dob: "2000-08-12",
                        city: "Bengaluru",
                        credit_score: 900,
                        loan_amount: 600000
                    };
                    chai.request(server)                
                        .post("/api/get_loan")
                        .send(loanIput)
                        .end((err, response) => {
                            response.should.have.status(400);
                            response.body.should.be.a('object');
                            response.body.should.have.property("message");
                            response.body.should.have.property("message").eq("Loan amount should be less than 500000");
                        done();
                        });
                        
                });

                /**
                 * minimum age criteria
                 */
                it("Apllication rejected due to minimum age criteria (minimum age should be 18)", (done) => {
                    const loanIput = {
                        name: "john",
                        dob: "2010-08-12",
                        city: "Bengaluru",
                        credit_score: 900,
                        loan_amount: 500000
                    };
                    chai.request(server)                
                        .post("/api/get_loan")
                        .send(loanIput)
                        .end((err, response) => {
                            response.should.have.status(400);
                            response.body.should.be.a('object');
                            response.body.should.have.property("message");
                            response.body.should.have.property("message").eq("Application Rejected");
                        done();
                        });
                        
                });

                /**
                 * maximu age criteria  
                 */

                it("Apllication rejected due to maximum age criteria (maximum age should be 59)", (done) => {
                    const loanIput = {
                        name: "john",
                        dob: "1945-08-12",
                        city: "Bengaluru",
                        credit_score: 900,
                        loan_amount: 500000
                    };
                    chai.request(server)                
                        .post("/api/get_loan")
                        .send(loanIput)
                        .end((err, response) => {
                            response.should.have.status(400);
                            response.body.should.be.a('object');
                            response.body.should.have.property("message");
                            response.body.should.have.property("message").eq("Application Rejected");
                        done();
                        });
                        
                });

                /**
                 * Check for credit score criteria for both Tier citeis.
                 */
                it("Apllication will reject due to low credit score (credit score should be greate than 300 for both Tier cities) ", (done) => {
                    const loanIput = {
                        name: "john",
                        dob: "2000-08-12",
                        city: "Bengaluru",
                        credit_score: 300,
                        loan_amount: 500000
                    };
                    chai.request(server)                
                        .post("/api/get_loan")
                        .send(loanIput)
                        .end((err, response) => {
                            response.should.have.status(400);
                            response.body.should.be.a('object');
                            response.body.should.have.property("message");
                            response.body.should.have.property("message").eq("Application Rejected");
                        done();
                        });
                        
                });

                /**
                 * Check for credit score criteria for Tier 2 cities.
                 */
                it("Apllication will reject due to low credit score for Tier2 cities (credit score should be greate than 500 for both Tier2 cities) ", (done) => {
                    const loanIput = {
                        name: "john",
                        dob: "1995-08-12",
                        city: "Hubli",
                        credit_score: 450,
                        loan_amount: 500000
                    };
                    chai.request(server)                
                        .post("/api/get_loan")
                        .send(loanIput)
                        .end((err, response) => {
                            response.should.have.status(400);
                            response.body.should.be.a('object');
                            response.body.should.have.property("message");
                            response.body.should.have.property("message").eq("Application Rejected");
                        done();
                        });
                        
                });

                /**
                 * check response for Tier2 city hubli.
                 */
                it("Show the response with Approved Loan details for Tier2 City Hubli. Request details city = hubli, credit_score = 850, loan_amount: 200000", (done) => {
                    const loanIput = {
                        name: "john",
                        dob: "1995-08-12",
                        city: "Hubli",
                        credit_score: 850,
                        loan_amount: 200000
                    };
                    chai.request(server)                
                        .post("/api/get_loan")
                        .send(loanIput)
                        .end((err, response) => {
                            response.should.have.status(200);
                            response.body.should.be.a('object');
                            response.body.should.have.property("ApplicationStaus");
                            response.body.should.have.property("ApplicationStaus").eq("Approve");
                            response.body.should.have.property("RateOfInterest");
                            response.body.should.have.property("RateOfInterest").eq("11%");
                        done();
                        console.log(response.body);
                        });
                        
                });


    });
})