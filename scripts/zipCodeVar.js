
// pointer to submit button
function lookForSubmitClick() {
    // Triggers the zip code submit on submit button click
    let submitButton = document.querySelector('[data-zipcode]');
    submitButton.addEventListener('click', getZipCode)

    // Triggers the zip code submit on pressing enter
    let zipField = document.querySelector('input');
    zipField.addEventListener('keypress', function(event){
        if(event.keyCode === 13) {
        getZipCode();
        }
    })
}


function getZipCode() {
    let zipCode = document.querySelector("[data-zipcodeinput]").value;
    getWeatherData(zipCode);
}






