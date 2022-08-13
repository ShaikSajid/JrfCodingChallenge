Instruction to understand and run the project.

1. Test cses are created for the validation, reject loan, approve loan, get loan schedule for tier1 city.

        U can run this test cases by using below command.
        command => npm test.

 2. To test the api on post man or any request tool use the below comand.
      command => npm start.

      use below url in postman or any API platform to test
          Request method: POST
                     URL: http://localhost:7000/api/get_loan 
                    Body: {
                        "name": "john",
                        "dob": "2000-08-12",
                        "city": "Bengaluru",
                        "credit_score": 400,
                        "loan_amount": 500000
                        }


     => by changing the values in body you can test it.
     