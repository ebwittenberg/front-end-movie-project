// takes zip code from zip code input field and shows user their city and next rainy day

// function is passed zip code from the user, fetches weather data object
function getWeatherData(zipcode) {
    // Below is for when we are actually calling the OpenWeatherMap API to get real-time forecast
    const weatherApiKey = '449d8f25bab8a422a5c3936e6e9abe0e';

    // first global variable
    zip = zipcode;

    const weatherForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us&appid=${weatherApiKey}`;
    
    // fetch the data from the weather forecast URL, returns a promise
    fetch(weatherForecastUrl)
        // take that promise and convert to JSON
        .then(function(response) {
            return response.json()
        })
        // take the second promise and call function that appends the city info, and function that will find rainy days
        .then(function(weatherObject) {
            console.log(weatherObject);
            createCityInfo(weatherObject);
            allRainyDays(weatherObject);
        })
}

// this function takes the weather object from the fetch chain, and starts displaying info to the user
function createCityInfo(weatherObject) {
    // creates pointer to weather div
    weatherDiv = document.querySelector('[data-weather]');
    // creates a h2 element for city info
    let cityH2 = document.createElement('h2');
    // assigns text content
    cityH2.textContent = `Rain is expected in ${weatherObject.city.name} this `;

    // puts the city h2 info into the weatherDiv
    weatherDiv.append(cityH2);

}

// this will find the first instance of rain in the 5 day forecast
function allRainyDays(weatherObject) {
    // array of data for each 3 hour period for 5 days
    let daysArray = weatherObject.list
    console.log(daysArray);
    // initialize empty array of rainy days
    let rainyDays = [];
    // loop through daysArray
    daysArray.forEach(function(day) {
        // if we find a instance where it is raining
        if (day.weather[0].main === 'Rain') {
            // add the rainy instance to the array
            rainyDays.push(day.dt_txt);
        }
    })
    console.log(rainyDays);
    firstRainyDay(rainyDays);
}

// this function will be passed the array of rainy days as an argument, it will take the first element in the array, and print it to the page

function firstRainyDay(rainyDaysArray) {
    // save first rainy instance in array
    // 2019-03-15 00:00:00
    let firstRainDay = rainyDaysArray[0];
    const daysOfTheWeekArray =['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday',]
    let dt = new Date(firstRainDay);
    let dayOfWeekIndex = dt.getDay()
    let dayOfWeek = daysOfTheWeekArray[dayOfWeekIndex]
    let rainyH2 = document.createElement('h2');
    rainyH2.textContent = dayOfWeek;

    weatherDiv.append(rainyH2);
    console.log(firstRainDay);
    fetchShowtimeData(firstRainDay);

}