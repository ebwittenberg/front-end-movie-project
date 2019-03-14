// const showtimeURL = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-03-13&zip=30312&api_key=4g7bvs4v2vy929mbgrqynbkv';

function fetchShowtimeData(date) {

    let dateArray = date.split(' ');
    const dateOnly = dateArray[0];

    let showtimeURL = `http://data.tmsapi.com/v1.1/movies/showings?startDate=${dateOnly}&zip=${zip}&api_key=4g7bvs4v2vy929mbgrqynbkv`;
    // returns a promise
    fetch(showtimeURL)
        .then(function(response) {
            return response.json()
        })
        .then(function(showtimeData) {
            console.log(showtimeData);
        })
}