
// pointer to submit button
function lookForSubmitClick() {

    let submitButton = document.querySelector('[data-zipcode]');
    submitButton.addEventListener('click', getZipCode)
}



function getZipCode() {
    let zipCode = document.querySelector("[data-zipcodeinput]").value;
    console.log (zipCode)
    getWeatherData(zipCode)
}






