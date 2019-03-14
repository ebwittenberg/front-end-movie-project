// takes zip code from zip code input field and shows user their city and next rainy day

// function is passed zip code from the user, fetches weather data object
function getWeatherData(zipcode) {
    // Below is for when we are actually calling the OpenWeatherMap API to get real-time forecast
    // const weatherApiKey = '449d8f25bab8a422a5c3936e6e9abe0e';

    // const weatherForecastUrl = `api.openweathermap.org/data/2.5/forecast?zip=${zipcode},us`;

    // Using the JSON weather...
    const jsonWeatherURL = '../json/atlWeather.json';
    
    // fetch the data from the jsonURL, returns a promise
    fetch(jsonWeatherURL)
        // take that promise and convert to JSON
        .then(function(response) {
            console.log(response)
            return response.json()
        })
        // take the second promise and console log the data
        .then(function(weatherObject) {
            createCityInfo(weatherObject);
            firstTimeRain(weatherObject);
        })
}

// this function takes the weather object from the fetch chain, and starts displaying info to the user
function createCityInfo(weatherObject) {
    // creates pointer to weather div
    const weatherDiv = document.querySelector('[data-weather]');
    // creates a h2 element for city info
    let cityH2 = document.createElement('h2');
    // assigns text content
    cityH2.textContent = `Your city is: ${weatherObject.city.name}`;

    // puts the city h2 info into the weatherDiv
    weatherDiv.append(cityH2);

}

// this will find the first instance of rain in the 5 day forecast
function firstTimeRain(weatherObject) {
    // array of data for each 3 hour period for 5 days
    let daysArray = weatherObject.list
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
}