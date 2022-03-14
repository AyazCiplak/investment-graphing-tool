//Retrieves values from input forms
const getValue = formValue => parseFloat(document.getElementById(formValue).value);


function displayValues() {

    const initialAmount = getValue("initial-investment");
    const years = getValue("years");
    const interestRate = getValue("interest-rate");
    const recurring = getValue("recurring-amount");

    document.getElementById("final-amount").innerHTML = "$";

};