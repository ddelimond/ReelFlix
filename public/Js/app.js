

// Variables

const hamburgerMenu = document.querySelector('.hamburger-menu');
const categoryBtnsContainer = document.querySelector('.category-container');
const movies = document.querySelectorAll('.movie-card-filter');
const movieOverlay = document.querySelector('.movie-overlay');
const movieList = document.querySelector('.movie-section-container');
const imbd = 'k_cmwzlhxy';
const tmdb = '0f33b6ea8c8d4e4629dab26d5b2c6c6f';
const genreBtnsContainer = document.querySelector('.btn-container')
const genreBtns = document.querySelectorAll('.btn');
const searchBar = document.querySelector('input');
const searchResults = document.querySelector('.search-results');


// Event Listeners

// Once button is clicked movie genres are fetched 
genreBtns.forEach(btn => {
    btn.addEventListener('click', getGenreMovies)
})

// Once Dom Content has loaded movie genres are displayed in the browser
window.addEventListener('DOMContentLoaded', getGenres);

// Opens the hamburgerMenu once the icon is clicked 
hamburgerMenu.addEventListener('click', openMenu);

// Each time a movie poster is selected the movie overlay will open and display the selected movies details
movies.forEach(movie => {
    movie.addEventListener('click', openMovieInfo)
});

// When a user is typing in the search field  the queried value is searched and return a list of movies matching the searched value
searchBar.addEventListener('keyup', fetchSearchedMovies)


// Functions


// Handles functionality when searching for movies using the search field
async function fetchSearchedMovies() {

    // if the typed value is less than 3 chars long the search results will not show,
    //  however if typed value is 3 or more chars, the movies titles that match the typed value are shown to the user.
    if (searchBar.value.length >= 3) { searchResults.classList.add('show') } else {
        searchResults.classList.remove('show')
    }

    // Variables
    const req = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDBKey}&query=${searchBar.value}`);
    const res = await req.json();
    const arr = res.results;

    // if the api finds movies that match the typed value,
    //  a movie card will appear for each found movie that contains the movie poster, release date, and title.
    // if nothing is found matching the typed value a message will be returned to inform the user.
    if (arr.length !== 0) {
        searchResults.innerHTML = arr.map(result => {

            return ` <div class="search-card">
<div class="search-item-img-container" data-id="${result.id}">
    <img src="https://image.tmdb.org/t/p/w500${result.poster_path}" class="search-item-img" alt="No Image">
</div>
<h4 class="search-item-name">${result.title}</h4>
<h4 class="search-realease-year">(${result.release_date.slice(0, 4) || 'N/A'})</h4>
</div>`
        }).join('')

        // Movie Card Variable
        let searchCards = document.querySelectorAll('.search-card');

        // Each time a user clicks on a returned movie from the searched movie list,
        //  a window with information pertaining to the film selected they will open.
        searchCards.forEach(card => {
            card.addEventListener('click', openSearch)
        });


    } else {
        searchResults.innerHTML = 'Sorry nothing matches your serach...'
    }
}

// Handles funtionality when a user selects one of the Genre Btns
async function getGenreMovies(e) {
    // Variables
    let genre = e.currentTarget.innerHTML;
    let genreID = e.currentTarget.attributes[2].nodeValue;
    let genreMoviesRes = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDBKey}&language=en-US&sort_by=popularity.desc&with_genres=${genreID}`)
    let genreMoviesData = await genreMoviesRes.json();
    let genreMovies = await genreMoviesData.results;
    let genreNameDom = document.querySelector('.category-name');

    // The genre banner name is changed to the specified genre 
    // that the user has selected, the name is in caps
    genreNameDom.innerHTML = await genre.toUpperCase();

    // The most popular movies from the selected genre are returned and placed in the movie container,
    //  each returned movie will be placed in a card that contains the movies id, poster, avr score, name, year of release.
    document.querySelector('.movies-container').innerHTML = genreMovies.map(movie => {
        return `<div class="movie-card-filter">
    <div class="movie-card" data-id="${movie.id}">
        <span class="rating">
            ${movie.vote_average}<i class="fa-solid fa-star"></i>
        </span>
        <div class="poster-container">
            <img src='https://image.tmdb.org/t/p/w500/${movie.poster_path}' alt=${movie.title}>
        </div>
        <div class="movie-info">
            <h5 class="movie-name">
                ${movie.title}
            </h5>
            <div class="details">
                <div class="year-date">
                    <span><span class="year">
                            ${movie.release_date.split('-')[0]}
                        </span>.<span class="runtime">60mins +</span></span>
                </div>
                <div class="platform">
                    <span>Movie</span>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>`
    }).join('')

    // if the movie details container container is open then the container will be closed, 
    // also if the catergory menu is open the it will be closed.
    if (movieOverlay.classList.contains('open')) {
        closeMovieInfo();
    } else if (categoryBtnsContainer.classList.contains('open')) {
        categoryBtnsContainer.classList.remove('open')
    }

    const movies = document.querySelectorAll('.movie-card-filter');
    // Event Listener
    // if one of the genre movies are clicked, its movie detail container will open.
    await movies.forEach(movie => {
        movie.addEventListener('click', openMovieInfo)
    });

}

// Handles the functionality to close a movie details container
function closeMovieInfo() {
    // changes the source for a movies trailer to a # ,
    //  this will stop the trailer if it is playing when a user tried to close out of the movie details container
    document.querySelector('#video').src = '#';

    movieOverlay.classList.add('close');
    movieOverlay.classList.remove('open');
    movieOverlay.style.display = 'none';
    movieOverlay.classList.remove('close');
    movieList.style.display = 'block';
    movieList.style.opacity = '1';
};


// function on opening hamburger menu containing movie genres, 
// adds open class to the movie genre container
function openMenu() {
    categoryBtnsContainer.classList.toggle('open')
};

// Handles getting the different genre of movies and creating a btn for the each genre 
// that will be placed in the genre btn container once the DOM loads
async function getGenres() {

    // Variables

    const genresRes = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDBKey}`);
    const genreData = await genresRes.json();
    const fetchedGenres = genreData.genres;

    // for each movie genre returned from the api a button is created containing the genre name and id 
    // all the buttons are joined together.
    const genreBtns = fetchedGenres.map(genre => {
        return `<button class="btn"  data-category="${genre.name}" data-genreID="${genre.id}">${genre.name}</button>`
    }).join('');

    // The button container html is changed to contain each of the genre btns html
    genreBtnsContainer.innerHTML = genreBtns;

    const genreBtn = document.querySelectorAll('.btn');

    // Each time a genre btn is clicked a request is sent 
    // to fetch the most popular movies for the specified genre
    genreBtn.forEach(btn => {
        btn.addEventListener('click', getGenreMovies)
    })
}

// Gathers all the information needed to create the movie details container
async function gatherInfo(data, rec, site, trailer) {
    // Variable
    let genre;

    // if api returns the movie data without any genres the variable genre 
    // will be 'N/A', if it does return genres for the movie it will get the first genre from the array
    if (data.genres.length === 0) { genre = 'N/A' } else { genre = data.genres[0].name }

    // html for movie details container html is filled in with movie data and then returned returned
    return movieOverlay.innerHTML = `<div class="movie-details-container">
<div class="details-btns">
    <a href="${site}" target="_blank" class="official-page">OFFICIAL PAGE</a>
    <button class="close-btn">
        <i class="fa-solid fa-circle-xmark"></i>
    </button>
</div>
<div class="movie-details">
    <div class="movie-poster">
        <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="${data.title}-poster">
    </div>
    <div class="info">
        <h2 class="movie-info-name">${data.title}</h2>
        <h4 class="movie-info-release-date">Release date: ${data.release_date}</h4>
        <div class="movie-info-ratings">
            <span>rating: ${data.vote_average} <i class="fa-solid fa-star"></i></span>
            <span class="movie-info-votes">all votes: ${data.vote_count}</span>
        </div>
        <div class="movie-info-genre">${genre}</div>
        <div class="movie-info-plot">
            <h4>${data.overview}</h4>
        </div>
    </div>
</div>

<div class="recommended">
<div class="line"></div>
<h3 class="rec-title">People who watched "${data.title}"also watch:</h3>
<div class="rec-posters">
    ${rec.results.map(poster => {
        return `<div class="movie-rec-poster" onclick="openSimMovieInfo(this)" data-id="${poster.id}" data-name="${poster.title}">
    <img src="https://image.tmdb.org/t/p/w500/${poster.poster_path}" alt="${poster.title}">
    </div>`}).join('')}
</div>
</div>

<div class="trailer">
    <div class="line"></div>
    <h3 class="trailer-title">Trailer:</h3>
    <iframe  id="video" src="${trailer.linkEmbed}"</iframe>

</div>

</div>`
}

// Opens the movies details container for a movie result shown in the search bar when a user types in a value 
async function openSearch(e) {
    // Gets movie id and name values from the selected movie's html
    const id = e.currentTarget.firstElementChild.attributes[1].nodeValue;
    const movieName = e.currentTarget.querySelector('.search-item-name').textContent;

    const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDBKey}`);
    const movieData = await movieRes.json();
    const imdbRes = await fetch(`https://imdb-api.com/en/API/SearchMovie/${apiKey}/${movieName}`);
    const imdbData = await imdbRes.json();
    const imdbId = imdbData.results[0].id;
    const movieOSRes = await fetch(`https://imdb-api.com/en/API/ExternalSites/${apiKey}/${imdbId}`);
    const movieOSData = await movieOSRes.json()
    const movieOfficialSite = movieOSData.officialWebsite;
    // IMDB Embedded property is linkEmbed 
    const imdbTrailRes = await fetch(`https://imdb-api.com/en/API/Trailer/${apiKey}/${imdbId}`);
    const imdbTrail = await imdbTrailRes.json();
    const simMovieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${TMDBKey}`);
    const simMovieData = await simMovieRes.json();
    const searchResults = document.querySelector('.search-results');
    const searchBar = document.querySelector('input');

    // resets the users search value back to a empty string
    searchBar.value = "";

    // if the search result container is open ,the show class is removed to close it/make it dissapear
    if (searchResults.classList.contains('show')) { searchResults.classList.remove('show') };


    // gathers information from the variables to create the clicked results movie details container
    await gatherInfo(movieData, simMovieData, movieOfficialSite, imdbTrail);


    let movieDetails = document.querySelector('.movie-details');
    let clsBtn = document.querySelector('.close-btn');

    clsBtn.addEventListener('click', closeMovieInfo);

    movieDetails.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movieData.backdrop_path})`;
    movieDetails.style.backgroundRepeat = 'no-repeat';
    movieDetails.style.backgroundSize = 'cover';



    movieList.style.display = 'none';
    movieList.style.opacity = '0';
    movieOverlay.style.display = 'flex';
    movieOverlay.classList.add('open');
    window.scrollTo(0, 0);
}

// Opens a selected movie's details container when navigationing on the the hompage or a genres  movie container
async function openMovieInfo(e) {
    // Variables
    // Gets movie id and name values from the selected movie's html
    const id = e.currentTarget.querySelector('.movie-card').attributes[1].nodeValue;
    const movieName = e.currentTarget.querySelector('.movie-card').querySelector('.movie-info').querySelector('.movie-name').textContent;


    const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDBKey}`);
    const movieData = await movieRes.json();
    const imdbRes = await fetch(`https://imdb-api.com/en/API/SearchMovie/${apiKey}/${movieName}`);
    const imdbData = await imdbRes.json();
    const imdbId = imdbData.results[0].id;
    const movieOSRes = await fetch(`https://imdb-api.com/en/API/ExternalSites/${apiKey}/${imdbId}`);
    const movieOSData = await movieOSRes.json()
    const movieOfficialSite = movieOSData.officialWebsite;
    // IMDB Embedded property is linkEmbed 
    const imdbTrailRes = await fetch(`https://imdb-api.com/en/API/Trailer/${apiKey}/${imdbId}`);
    const imdbTrail = await imdbTrailRes.json();
    const simMovieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${TMDBKey}`);
    const simMovieData = await simMovieRes.json();



    // gathers information from the variables to create the clicked films movie details container
    await gatherInfo(movieData, simMovieData, movieOfficialSite, imdbTrail);

    let movieDetails = document.querySelector('.movie-details');
    let clsBtn = document.querySelector('.close-btn');

    // Event Listener
    // if close button is clicked the movie details container is closed
    clsBtn.addEventListener('click', closeMovieInfo);

    movieDetails.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${movieData.backdrop_path})`;
    movieDetails.style.backgroundRepeat = 'no-repeat';
    movieDetails.style.backgroundSize = 'cover';



    movieList.style.display = 'none';
    movieList.style.opacity = '0';
    movieOverlay.style.display = 'flex';
    movieOverlay.classList.add('open');
    window.scrollTo(0, 0);

}











































