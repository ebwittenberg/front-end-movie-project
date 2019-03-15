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

            storeShowTimeData(showtimeData)

            let movieTitle = showtimeData[12].title
            // create array of movie titles in user's area
            let movieTitles = [];
            // loop through each movie in user's area, push title to the movie titles area
            showtimeData.forEach(function(movie) {
                movieTitles.push(movie.title)
            })
            console.log(movieTitles);

            // loop through each movie title
            movieTitles.forEach(function(title) {
                fetchOmdbData(title);
            })

            console.log(movieTitle);
            // fetchOmdbData(movieTitle);
            // retrieveMovieDetails(showtimeData);
            
        })
}

function storeShowTimeData(showtimeDatas) {
    const jsonStingShowTimeData = JSON.stringify(showtimeDatas)
    console.log(`Saving ${Object.keys(showtimeDatas).length} movies to local storage`)

    localStorage.setItem('movie-data', jsonStingShowTimeData)


}


function fetchOmdbData(movieTitle) {
    const omdbUrl = `http://www.omdbapi.com/?apikey=48ba5f31&t=${movieTitle}`
    let title = movieTitle;
    fetch(omdbUrl)
    .then (function(response) {
        console.log(response);
        return response.json();
    })
    .then (function(movieData) {
        console.log(movieData)
        let imageUrl = movieData.Poster
        console.log(imageUrl)
        drawMoviePoster(title, imageUrl)
    })
}

function drawMoviePoster(movieTitle, imageUrl) {
    let posterContainer = document.querySelector('[data-postercontainer]');
    let posterFrame = document.createElement('div');
    // replace spaces in movie title with dashes
    let dashesMovieTitle = movieTitle.replace(/ /g, "-");
    posterFrame.classList.add(dashesMovieTitle);
    let img = document.createElement('img');

    img.setAttribute('src', imageUrl);
    
    posterContainer.append(posterFrame);
    posterFrame.append(img);

}

