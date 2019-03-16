
// pointer to submit button
function lookForSubmitClick() {
    // Triggers the zip code submit on submit button click
    // let submitButton = document.querySelector('[data-zipcode]');
    // submitButton.addEventListener('click', function() {
    //     getZipCode();
        // when user submits their zip code, hide the zip code search bar
        // const zipCodeDiv = document.querySelector('.zip-code-search');
        // zipCodeDiv.classList.add('hidden');
    // })

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

    const zipCodeDiv = document.querySelector('.zip-code-search');
    zipCodeDiv.classList.add('hidden');
}






