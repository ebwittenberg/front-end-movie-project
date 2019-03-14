
// pointer to submit button
let submitButton = document.querySelector('[data-zipcode]');
submitButton.addEventListener('click', getZipCode)



function getZipCode() {
    let zipCode = document.querySelector("[data-zipcodeinput]").value;
    console.log (zipCode)
    getWeatherData(zipCode)
}


const daysOfTheWeekArray =['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',]
let dt = new Date("2019-03-16 15:00:00");
let dayOfWeekNum = dt.getDay()
let dayOfWeek = daysOfTheWeekArray[dayOfWeekNum]
console.log("Today is: " + dayOfWeek );



