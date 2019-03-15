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
    let dashesMovieTitle = movieTitle.replace(/ /g, "_");
    
    // add event listener to each poster frame that calls a function
    
    let img = document.createElement('img');
    
    img.setAttribute('src', imageUrl);
    img.classList.add(dashesMovieTitle);
    
    img.addEventListener('click', function() {
        getMovieClassName(event);
    })
    posterContainer.append(posterFrame);
    posterFrame.append(img);

}

// add movie details to bottom of page (for now) when poster is clicked on
function getMovieClassName(event) {
    let dashesMovieTitle = event.target.classList[0];
    // convert dashes movie title back to spaces
    let movieTitle = dashesMovieTitle.replace(/_/g, " ");
    console.log(movieTitle);

    let storedMovieData = localStorage.getItem('movie-data');
    let parsedMovieData = JSON.parse(storedMovieData);
    parsedMovieData.forEach(function (movie) {
        if (movie.title === movieTitle) {
            let movieTitleDiv = document.querySelector('[data-info-pop]');
            let titleh2 = document.createElement('h2');
            titleh2.textContent = movie.title;
            movieTitleDiv.append(titleh2);

            let movieTheaterArray = [];
            movie.showtimes.forEach(function (theatre) {
                movieTheaterArray.push(theatre.theatre.name);



            })
            let uniqueTheaters = buildUniqueTheaterArray(movieTheaterArray);
            appendTheaterDetails(movie, uniqueTheaters);
        }
    })
}

function buildUniqueTheaterArray(showtimes) {
    let uniqueTheaterArray = [];
    let prevTheater;

    showtimes.forEach(function (showtime) {
        if (showtime !== prevTheater) {
            uniqueTheaterArray.push(showtime);
        }
        prevTheater = showtime;
    })
    return uniqueTheaterArray;

}

function appendTheaterDetails(movieData, theatersArray) {
    // console.log(parsedData)
    console.log(movieData);
    theatersArray.forEach(function(theaterName) {
        let popUpDiv = document.querySelector('[data-info-pop]')
        let theaterNameH2 = document.createElement('h2')
        // set text content of h2 to the unique theater name
        theaterNameH2.textContent = theaterName;
        popUpDiv.append(theaterNameH2);

        // loop through the showtimes for that movie
        movieData.showtimes.forEach(function(showtime) {
            if (showtime.theatre.name === theaterName) {
                console.log('found a match');
                // create paragraph element for the showtime
                let showtimePara = document.createElement('p')
                showtimePara.textContent = showtime.dateTime
                console.log(showtimePara);
                // append para to popup div
                popUpDiv.append(showtimePara);
            }
        })

    

        // let theaterNameH2.textContent = theatersArray.
    
    })
}


