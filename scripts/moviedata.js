//jS
function retrieveMovieDetails (showTimeData) {
    // console.log(showTimeData);
    let movieTitle = showTimeData[12].title;
    let dataContainer = document.querySelector('[data-info-pop]');
    let movieTitleh2 = document.createElement('h2');
    movieTitleh2.textContent = movieTitle;
    dataContainer.append(movieTitleh2);

}