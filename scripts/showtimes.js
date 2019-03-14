// const showtimeURL = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-03-13&zip=30312&api_key=4g7bvs4v2vy929mbgrqynbkv';

function fetchShowtimeData(date) {

    let dateArray = date.split(' ');
    const dateOnly = dateArray[0];

    let showtimeURL = `http://data.tmsapi.com/v1.1/movies/showings?startDate=${dateOnly}&zip=${zip}&api_key=36zekhh8ta2kuj2cujbj55rd`;
    // returns a promise
    fetch(showtimeURL)
        .then(function(response) {
            return response.json()
        })
        .then(function(showtimeData) {
            console.log(showtimeData);
            let movieTitle = showtimeData[12].title
            console.log(movieTitle);
            fetchOmdbData(movieTitle)
            retrieveMovieDetails(showtimeData)
            
        })
}


function fetchOmdbData(movieTitle) {
    const omdbUrl = `http://www.omdbapi.com/?apikey=48ba5f31&t=${movieTitle}`
    fetch(omdbUrl)
    .then (function(response) {
        console.log(response);
        return response.json();
    })
    .then (function(movieData) {
        console.log(movieData)
        let imageUrl = movieData.Poster
        console.log(imageUrl)
        drawMoviePoster(imageUrl)
    })
}

function drawMoviePoster(imageUrl) {
    let posterContainer = document.querySelector('[data-postercontainer]');
    let posterFrame = document.createElement('div');
    let img = document.createElement('img');

    img.setAttribute('src', imageUrl);
    
    posterContainer.append(posterFrame);
    posterFrame.append(img);

}

