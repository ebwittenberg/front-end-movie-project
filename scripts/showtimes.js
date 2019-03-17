function fetchShowtimeData(date) {
    console.log(date);
    let dateArray = date.split(' ');
    const dateOnly = dateArray[0];

    let showtimeURL = `http://data.tmsapi.com/v1.1/movies/showings?startDate=${dateOnly}&zip=${zip}&api_key=36zekhh8ta2kuj2cujbj55rd`;
    // showtime URL is going to give us all the movies that are playing in the zip code radius
    // returns a promise
    fetch(showtimeURL)
        .then(function(response) {
            return response.json()
        })
        .then(function(showtimeData) {
            console.log(showtimeData);

            // puts all the showtimeData info in local storage for later use
            storeShowTimeData(showtimeData)
            // create array of movie titles in user's area
            let movieTitles = [];
            // loop through each movie in user's area, push title to the movie titles array
            showtimeData.forEach(function(movie) {
                movieTitles.push(movie.title)
            })

            // loop through each movie title to get the OMDB data for each movie
            movieTitles.forEach(function(title) {
                fetchOmdbData(title);
            })

            
        })
}

function storeShowTimeData(showtimeDatas) {
    const jsonStringShowTimeData = JSON.stringify(showtimeDatas)
    console.log(`Saving ${Object.keys(showtimeDatas).length} movies to local storage`)

    localStorage.setItem('ST-movie-data', jsonStringShowTimeData)


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

function drawMoviePoster(STmovieTitle, imageUrl, omdbMovieData) {
    let posterContainer = document.querySelector('[data-postercontainer]');
    let posterFrame = document.createElement('div');
    // gives each poster frame a class so we can style it
    posterFrame.classList.add('poster-frame');
    // replace spaces in movie title with dashes
    let underscoreMovieTitle = STmovieTitle.replace(/ /g, "_");
    
    // if there is no poster on OMDB database or if the OMDB database can't find the movie at all
    if (imageUrl === 'N/A' || STmovieTitle !== omdbMovieData.Title) {
        // replace poster art with movie title text
        let backupPosterText = document.createElement('h2');
        backupPosterText.textContent = STmovieTitle;
        posterFrame.classList.add(underscoreMovieTitle);
        posterFrame.append(backupPosterText);
        posterContainer.append(posterFrame);

        backupPosterText.classList.add(underscoreMovieTitle);

        posterFrame.addEventListener('click', function() {
            getMovieClassName(event);
        })

    } else {
        // put the actual poster art in the poster container
        // make an image with the poster URL
        let img = document.createElement('img');
        
        img.setAttribute('src', imageUrl);
        
        img.classList.add(underscoreMovieTitle);
        
        // add event listener to each poster frame that calls a function
        img.addEventListener('click', function() {
            getMovieClassName(event);
        })
        posterContainer.classList.remove('hidden');
        posterContainer.append(posterFrame);
        posterFrame.append(img);
    }

}

// add movie details to bottom of page (for now) when poster is clicked on
function getMovieClassName(event) {

    console.log(event.target);
    console.log(event.target.classList);
    let underscoreMovieTitle;
    // if user clicks on movie that has no poster
    if (event.target.classList[1]) {
        // pull movie title from second class
        underscoreMovieTitle = event.target.classList[1]
    } else {
        // pull movie title from class on image
        underscoreMovieTitle = event.target.classList[0];
    }
    console.log(underscoreMovieTitle);
    // convert dashes movie title back to spaces
    let STmovieTitle = underscoreMovieTitle.replace(/_/g, " ");

    let storedSTMovieData = localStorage.getItem('ST-movie-data');
    let parsedSTMovieData = JSON.parse(storedSTMovieData);
    parsedSTMovieData.forEach(function (STMovieObject) {
        if (STMovieObject.title === STmovieTitle) {
            let movieTitleDiv = document.querySelector('[data-info-pop]');
            let titleh2 = document.createElement('h2');
            titleh2.textContent = STMovieObject.title;
            movieTitleDiv.append(titleh2);

            // this array has duplicate theaters in it that are all sorted together
            let movieTheaterArray = [];
            STMovieObject.showtimes.forEach(function (theatre) {
                movieTheaterArray.push(theatre.theatre.name);


            })
            // unique theaters is an array with just the unique theater names
            let uniqueTheaters = buildUniqueTheaterArray(movieTheaterArray);
            appendMovieDetails(STMovieObject);
            appendTheaterDetails(STMovieObject, uniqueTheaters);
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

// shows theater name in larger text, with showtimes at that theater following it
function appendTheaterDetails(STMovieObject, uniqueTheatersArray) {

    
    uniqueTheatersArray.forEach(function(theaterName) {
        let movieDetailsDiv = document.querySelector('[data-info-pop]')
        let mainDiv = document.querySelector('[data-main]');
        let body = document.querySelector('body');

        // unhide movie details div

        movieDetailsDiv.classList.remove('hidden');
        mainDiv.classList.add('blurry');

        body.addEventListener('click', function(event) {
            if (event.target === body) {
                console.log('clicked off details div');
                movieDetailsDiv.classList.add('hidden');
                mainDiv.classList.remove('blurry');
                movieDetailsDiv.textContent = '';
                console.log(movieDetailsDiv.childNodes);
            }
        })

    
        // movieDetailsDiv.addEventListener('click', function() {
        // })

        let theaterNameH2 = document.createElement('h2')
        // set text content of h2 to the unique theater name
        theaterNameH2.textContent = theaterName;
        movieDetailsDiv.append(theaterNameH2);

        // loop through the showtimes for that movie
        STMovieObject.showtimes.forEach(function(showtime) {
            // only want to append the showtimes that correspond to the matching theater names
            if (showtime.theatre.name === theaterName) {
                // create paragraph element for the showtime
                let showtimePara = document.createElement('p');
                showtimePara.classList.add('showtime');

                // converts show times to AM/PM
                let timeNoDate = (showtime.dateTime).split('T');
                // console.log (timeNoDate[1])
                let armyTime = timeNoDate[1];
                let armyTimeString = armyTime.toString();
                // console.log(armyTimeString)
                let splitTimeArray = armyTimeString.split(':');
                console.log(splitTimeArray);
                let hours = Number(splitTimeArray[0]);
                let minutes = Number(splitTimeArray[1]);
                let convertedTime;

                if (hours > 0 && hours <= 12) {
                    convertedTime= "" + hours;
                } else if (hours > 12) {
                    convertedTime= "" + (hours - 12);
                } else if (hours == 0) {
                    convertedTime= "12";
                }
                
                convertedTime += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
                convertedTime += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
                console.log(convertedTime)




                // puts actual show time as text content
                showtimePara.textContent = convertedTime
                // append para to popup div
                movieDetailsDiv.append(showtimePara);
            }
        })
    
    })
}

// uses OMDB database API to draw certain movie details to the pop-up div
function appendMovieDetails(STMovieObject) {
    // gets movie info for clicked on movie from local storage
    let storedOmbdMovieInfo = localStorage.getItem(STMovieObject.title);
    let parsedOmdbMovieInfo = JSON.parse(storedOmbdMovieInfo);

    
    let movieDetailsDiv = document.querySelector('[data-info-pop]');
    
    // draws summary into pop up div
    let movieSummaryH2 = document.createElement('h2');
    movieSummaryH2.textContent = parsedOmdbMovieInfo.Plot;

    movieDetailsDiv.append(movieSummaryH2);

    // draws movie MCAA rating into pop up div
    let MCAARatingH2 = document.createElement('h2')
    MCAARatingH2.textContent = parsedOmdbMovieInfo.Rated
 
    movieDetailsDiv.append(MCAARatingH2);


    // draws IMDB review into pop up div
    let ratingsH2 = document.createElement('h2');
    ratingsH2.textContent = `IMDB Rating: ${parsedOmdbMovieInfo.imdbRating}`;

    if (parsedOmdbMovieInfo.imdbRating === "N/A") {
        ratingsH2.textContent = "";
    }
    movieDetailsDiv.append(ratingsH2);

}

// if search again is clicked, go back to search bar

function resetSearch() {
    const searchAgain = document.querySelector('[data-search-again]');
    searchAgain.addEventListener('click', function() {
        console.log('reset started');
        location.reload();
    });
}

