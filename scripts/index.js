function main() {
    // zip code function goes here
    lookForSubmitClick();

    let movieSearchField = document.querySelector('.movie-input');
    console.log(movieSearchField);
    movieSearchField.addEventListener('change', function() {
        searchMovies();
    })
    movieSearchField.addEventListener('keyup', function(){
        console.log('changed');
        searchMovies();
    })
    resetSearch();
    
}

main();