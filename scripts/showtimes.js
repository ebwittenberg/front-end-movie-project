// const showtimeURL = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=2019-03-13&zip=30312&api_key=4g7bvs4v2vy929mbgrqynbkv';

function fetchShowtimeData(date) {

    let dateArray = date.split(' ');
    const dateOnly = dateArray[0];

    let showtimeURL = `http://data.tmsapi.com/v1.1/movies/showings?startDate=${dateOnly}&zip=${zip}&api_key=xguxvke7xybd3fsscb7h446v`;
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
    const jsonStringShowTimeData = JSON.stringify(showtimeDatas)
    console.log(`Saving ${Object.keys(showtimeDatas).length} movies to local storage`)

    localStorage.setItem('movie-data', jsonStringShowTimeData)


}


function fetchOmdbData(movieTitle) {
    const omdbUrl = `http://www.omdbapi.com/?apikey=48ba5f31&t=${movieTitle}`
    let title = movieTitle;
    fetch(omdbUrl)
    .then (function(response) {
        return response.json();
    })
    .then (function(omdbMovieData) {
        let omdbFilmData = omdbMovieData;
        // store ombd data for that movie in localStorage
        const jsonStringOmbdData = JSON.stringify(omdbMovieData);
        localStorage.setItem(title, jsonStringOmbdData);


        let imageUrl = omdbMovieData.Poster
        drawMoviePoster(title, imageUrl, omdbMovieData)
    })
}

function drawMoviePoster(movieTitle, imageUrl, omdbMovieData) {
    let posterContainer = document.querySelector('[data-postercontainer]');
    let posterFrame = document.createElement('div');
    // replace spaces in movie title with dashes
    let dashesMovieTitle = movieTitle.replace(/ /g, "-");
    
    
    if (imageUrl === 'N/A' || movieTitle !== omdbMovieData.Title) {
        // do something
        let backupPosterText = document.createElement('h2');
        backupPosterText.textContent = movieTitle;
        posterFrame.append(backupPosterText);
        posterContainer.append(posterFrame);

    } else {
        // make an image with the poster URL
        let img = document.createElement('img');
        
        img.setAttribute('src', imageUrl);
        
        img.classList.add(dashesMovieTitle);
        
        // add event listener to each poster frame that calls a function
        img.addEventListener('click', function() {
            getMovieClassName(event);
        })
        posterContainer.append(posterFrame);
        posterFrame.append(img);
    }

}

// add movie details to bottom of page (for now) when poster is clicked on
function getMovieClassName(event) {
    let dashesMovieTitle = event.target.classList[0];
    // convert dashes movie title back to spaces
    let movieTitle = dashesMovieTitle.replace(/-/g, " ");
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
            appendMovieDetails(movie);
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
    theatersArray.forEach(function(theaterName) {
        let popUpDiv = document.querySelector('[data-info-pop]')
        let theaterNameH2 = document.createElement('h2')
        // set text content of h2 to the unique theater name
        theaterNameH2.textContent = theaterName;
        popUpDiv.append(theaterNameH2);

        // loop through the showtimes for that movie
        movieData.showtimes.forEach(function(showtime) {
            if (showtime.theatre.name === theaterName) {
                // create paragraph element for the showtime
                let showtimePara = document.createElement('p')
                showtimePara.textContent = showtime.dateTime
                // append para to popup div
                popUpDiv.append(showtimePara);
            }
        })
    
    })
}

// uses OMDB database API to draw certain movie details to the pop-up div
function appendMovieDetails(film) {
    // gets movie info for clicked on movie from local storage
    let storedOmbdMovieInfo = localStorage.getItem(film.title);
    let parsedOmdbMovieInfo = JSON.parse(storedOmbdMovieInfo);
    console.log(parsedOmdbMovieInfo);

    
    let movieDetailsDiv = document.querySelector('[data-info-pop]');
    
    // draws summary into pop up div
    let movieSummaryH2 = document.createElement('h2')
    movieSummaryH2.textContent = parsedOmdbMovieInfo.Plot
    console.log(parsedOmdbMovieInfo.Plot)

    movieDetailsDiv.append(movieSummaryH2);

     // draws movie MCAA rating into pop up div
     let MCAARatingH2 = document.createElement('h2')
     MCAARatingH2.textContent = parsedOmdbMovieInfo.Rated
     console.log(parsedOmdbMovieInfo.Rated)
 
     movieDetailsDiv.append(MCAARatingH2);


    // draws IMDB review into pop up div
    let ratingsH2 = document.createElement('h2');
    ratingsH2.textContent = `IMDB Rating: ${parsedOmdbMovieInfo.imdbRating}`;

    if (parsedOmdbMovieInfo.imdbRating === "N/A") {
        ratingsH2.textContent = "";
    }
    movieDetailsDiv.append(ratingsH2);

}
