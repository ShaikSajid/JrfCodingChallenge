export const cities = [{ name: "Bengaluru", type: "Tier1" }, { name: "Mumbai", type: "Tier1" },
{ name: "Delhi", type: "Tier1" }, { name: "Chennai", type: "Tier1" }, { name: "Hyderabad", type: "Tier1"},
{ name: "Mysore", type: "Tier2" }, { name: "Hubli", type: "Tier2" },
{ name: "Dharwad", type: "Tier2" }, { name: "Belgaum", type: "Tier2" }, { name: "Shimoga", type: "Tier2" }];

export const creditScoreCriteria = [
    { minCredit: 300, maxCredit: 500, cityType: "Tier1", rateOfInterest: 14 },
    { minCredit: 501, maxCredit: 700, cityType: "Tier1", rateOfInterest: 12 },
    { minCredit: 501, maxCredit: 700, cityType: "Tier2", rateOfInterest: 13 },
    { minCredit: 701, maxCredit: 800, cityType: "Tier1", rateOfInterest: 12 },
    { minCredit: 701, maxCredit: 800, cityType: "Tier2", rateOfInterest: 13 },
    { minCredit: 801, maxCredit: 900, cityType: "Tier1", rateOfInterest: 10 },
    { minCredit: 801, maxCredit: 900, cityType: "Tier2", rateOfInterest: 11 }
];
export const tenureMonths = 12 ;
export const loanTenure = 1;

export const  getAge = (dateString) =>{
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export const  convertDate = (inputFormat) => {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }


  export const getSchedule=(creditScore,loan_amount )=>{
    let principal = 0;
    let loanAmount = loan_amount;
    let month = 1
    let loanArr = [];;
    for (let i = 12 ; i > 0; --i)
    {
        let loanObject = {};
        loanAmount = loanAmount -principal;
         principal = loanAmount / i;
        let interest = (creditScore.rateOfInterest * loan_amount) / 12 ;
        loanObject.Principal = Math.ceil(principal);
        loanObject.Interest = Math.ceil(interest);
        var now = new Date();
        var current = new Date(now.getFullYear(), now.getMonth()+month, 1);
        loanObject.EMIDate = convertDate(current);
        loanArr.push(loanObject);
        month++;
    }
    var finalObjet={};
    finalObjet.RateOfInterest=creditScore.rateOfInterest +"%";
    finalObjet.ApplicationStaus= "Approve";
    finalObjet.Schedule = loanArr;
    return finalObjet;
  }