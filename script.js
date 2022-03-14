//Retrieves values from input forms
const getValue = formValue => parseFloat(document.getElementById(formValue).value);

function setAxes() {

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

    //Based on a value and an amount of increments, finds fractional value at each increment
    const findIncrement = (value, totalIncrements, increment) => (value/(totalIncrements/increment)).toFixed(2);
    
    //For both graphs, finds and displays x-axis increments based on years, and y-axis increments based on final investment value
    for (let i = 0; i < xValues.length; i++){
        document.getElementsByClassName(xValues[i])[0].innerHTML = findIncrement(years, xValues.length, i+1);
        document.getElementsByClassName(xValues[i])[1].innerHTML = findIncrement(years, xValues.length, i+1);
    };

    for (let i = 0; i < yValues.length; i++){
        document.getElementsByClassName(yValues[i])[0].innerHTML = findIncrement(parseFloat(futureValue), yValues.length, i+1);
        document.getElementsByClassName(yValues[i])[1].innerHTML = findIncrement(parseFloat(futureValue), yValues.length, i+1);
    };
    
    //Displays final value of investment
    document.getElementById("final-amount").innerHTML = futureValue + " $"

};

function setTotalBars() {

    const initialAmount = getValue("initial-investment");
    const years = getValue("years");
    const interestRate = getValue("interest-rate")/100;
    const recurring = getValue("recurring-amount");
    //Retrieves selected radio input option
    const frequency = parseFloat(document.querySelector('input[name="contribution-frequency"]:checked').value);

    const barValues = ["bar-1", "bar-2", "bar-3", "bar-4", "bar-5", "bar-6", "bar-7", "bar-8"];

    //Finds progression of investment at any increment of time
    function valueAtIncrement(increment, totalIncrements) {
        const incrementFraction = increment/totalIncrements;
        return (initialAmount*((1+interestRate)**(years*incrementFraction))) + ((recurring*frequency)*(((1+interestRate)**(years*incrementFraction))-1))/interestRate;
    };

    //Computes height percentage of each bar based on the maximum (final) bar's height
    const heightProportion = (value) => ((value / valueAtIncrement(barValues.length, barValues.length))*100) + "%";

    for (let i = 0; i < barValues.length; i++){
        document.getElementById(barValues[i]).style.height = heightProportion(valueAtIncrement(i+1, barValues.length));
    };

}