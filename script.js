//Retrieves values from input forms
const getValue = formValue => parseFloat(document.getElementById(formValue).value);

//Elements for graphs
const xValues = ["x-value-1", "x-value-2", "x-value-3", "x-value-4", "x-value-5", "x-value-6", "x-value-7", "x-value-8"];

const yValues = ["y-value-1", "y-value-2", "y-value-3", "y-value-4", "y-value-5"];

const totalBarValues = ["bar-1", "bar-2", "bar-3", "bar-4", "bar-5", "bar-6", "bar-7", "bar-8"];

const contBarValues = [
    "contribution-bar-1",
    "contribution-bar-2", 
    "contribution-bar-3", 
    "contribution-bar-4", 
    "contribution-bar-5", 
    "contribution-bar-6", 
    "contribution-bar-7", 
    "contribution-bar-8"
];

const intBarValues = [
    "interest-bar-1", 
    "interest-bar-2", 
    "interest-bar-3", 
    "interest-bar-4", 
    "interest-bar-5", 
    "interest-bar-6",  
    "interest-bar-7",  
    "interest-bar-8"
];

//Computes final value of investment
function findFinalValue(ia, ir, yrs, rc, frq) {
    return (ia*((1+ir)**yrs) + rc*frq*(((1+ir)**yrs)-1)/ir).toFixed(2);
};

//Based on a final value and an amount of increments, finds fractional values at each increment (**Note: Only works for constant increments)
const findIncrement = (value, totalIncrements, increment) => (value/(totalIncrements/increment)).toFixed(2);


function setAxes() {

    const initialAmount = getValue("initial-investment");
    const years = getValue("years");
    const interestRate = getValue("interest-rate")/100;
    const recurring = getValue("recurring-amount");
    //Retrieves selected radio input option
    const frequency = parseFloat(document.querySelector('input[name="contribution-frequency"]:checked').value);

    const futureValue = findFinalValue(initialAmount, interestRate, years, recurring, frequency);


    //For both graphs, finds and displays x-axis increment values based on years, and y-axis increments based on final investment value
    for (let i = 0; i < xValues.length; i++){  
        document.getElementsByClassName(xValues[i])[0].innerHTML = findIncrement(years, xValues.length, i+1);
        document.getElementsByClassName(xValues[i])[1].innerHTML = findIncrement(years, xValues.length, i+1);
    };

    for (let i = 0; i < yValues.length; i++){
        document.getElementsByClassName(yValues[i])[0].innerHTML = findIncrement(parseFloat(futureValue), yValues.length, i+1);
        document.getElementsByClassName(yValues[i])[1].innerHTML = findIncrement(parseFloat(futureValue), yValues.length, i+1);
    };
    
    //Displays final value of investment
    if (futureValue == "NaN") {
        document.getElementById("final-amount").innerHTML = "Invalid Input";
    } else {
    document.getElementById("final-amount").innerHTML = futureValue + " $";
    };

    //Finds exponential investment value at any increment
    function findVariableIncrement(increment, totalIncrements) {
        const incrementFraction = increment/totalIncrements;
        return findFinalValue(initialAmount, interestRate, (years*incrementFraction), recurring, frequency);
    };

    //Computes height percentage of each bar based on the maximum (final) bar's height
    const heightProportion = (value) => (value / futureValue * 100) + "%";

    //Finds proportion of each bar based on the max. value
    for (let i = 0; i < totalBarValues.length; i++){
        const currentValue = findVariableIncrement(i+1, totalBarValues.length);
        document.getElementById(totalBarValues[i]).style.height = heightProportion(currentValue);
    };

    //Finds net contributions at any increment of time
    function contValueAtIncrement(increment, totalIncrements) {
        const incrementFraction = increment/totalIncrements;
        return initialAmount + (years*incrementFraction)*recurring*frequency;
    };

    for (let i = 0; i < contBarValues.length; i++){
        const currentValue = contValueAtIncrement(i+1, contBarValues.length);
        document.getElementById(contBarValues[i]).style.height = heightProportion(currentValue);
    };

    function interestValueAtIncrement(increment, totalIncrements) {
        return findVariableIncrement(increment, totalIncrements) - contValueAtIncrement(increment, totalIncrements);
    };

    for (let i = 0; i < intBarValues.length; i++) {
        const currentValue = interestValueAtIncrement(i+1, intBarValues.length);
        document.getElementById(intBarValues[i]).style.height = heightProportion(currentValue);
    }
};
