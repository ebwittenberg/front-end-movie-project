//jS
function retrieveMovieDetails (showTimeData) {
    // console.log(showTimeData);
    //create var to hold movie information to print
    let movieTitle = showTimeData[12].title;
    let shortDescription = showTimeData[12].shortDescription
    let showTimes = showTimeData[12].showtimes;
    
    
    //select the container for the print infromation
    let dataContainer = document.querySelector('[data-info-pop]');
    let descriptionContainer = document.querySelector('[data-info-pop]');
    let showtimesContainer = document.querySelector('[data-info-pop]');
    
    //set second var to create the html idenity 
    let movieTitleh2 = document.createElement('h2');
    let shortDescriptionh2 = document.createElement('h2');
    let showTimesh2 = document.createElement('h2');
    
    //give the vars there text content
    movieTitleh2.textContent = movieTitle;
    shortDescriptionh2.textContent = movieTitle;
    showTimesh2.textContent = showTimes;
    
    //add the vars text to the DOM
    dataContainer.append(movieTitleh2);
    descriptionContainer.append(shortDescriptionh2);
    showtimesContainer.append(showTimesh2);
    
}