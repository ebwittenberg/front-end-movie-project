const weatherForecastUrl = `http://api.openweathermap.org/data/2.5/forecast?zip=30312,us&units=imperial&appid=58aa95e71dfc9f2a24bed5cd37d8213e`

console.log(weatherForecastUrl)

fetch(weatherForecastUrl)
.then (function(response) {
    return response.json();
})
.then (function(weatherData) {
    console.log(weatherData)
})


console.log("Branch Yo!");