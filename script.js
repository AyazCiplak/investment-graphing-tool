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
    const futureValue = (initialAmount*((1+interestRate)**years) + recurring*frequency*(((1+interestRate)**years)-1)/interestRate).toFixed(2);

    const xValues = ["x-value-1", "x-value-2", "x-value-3", "x-value-4", "x-value-5", "x-value-6", "x-value-7", "x-value-8"];
    const yValues = ["y-value-1", "y-value-2", "y-value-3", "y-value-4", "y-value-5"];

    document.getElementById("final-amount").innerHTML = futureValue + " $"

};