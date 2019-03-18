function main() {
    // zip code function goes here
    lookForSubmitClick();

    let movieSearchField = document.querySelector('[data-movie-search]');
    movieSearchField.addEventListener('keypress', function(event){
        if(event.keyCode === 13) {

            searchMovies();

        }
    })
    resetSearch();
    
}

main();