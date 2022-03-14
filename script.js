//Retrieves values from input forms
const getValue = formValue => parseFloat(document.getElementById(formValue).value);


function displayValues() {

    const initialAmount = getValue("initial-investment");
    const years = getValue("years");
    const interestRate = getValue("interest-rate")/100;
    const recurring = getValue("recurring-amount");
    //Retrieves selected radio input option
    const frequency = parseFloat(document.querySelector('input[name="contribution-frequency"]:checked').value);

    //Computes future value of investment with compound interest formula
    

};