import { apiKey } from "./apiKey.js";
import { TMDBKey } from "./apiKey.js";


// Variables
const hamburgerMenu = document.querySelector('.hamburger-menu');
const categoryBtnsContainer = document.querySelector('.category-container');
const movies = document.querySelectorAll('.movie-card-filter');
const movieOverlay = document.querySelector('.movie-overlay');

const movieList = document.querySelector('.movie-section-container');
const genreBtnsContainer = document.querySelector('.btn-container')
const genreBtns = document.querySelectorAll('.btn');
const searchBar = document.querySelector('input');
const searchResults = document.querySelector('.search-results');



genreBtns.forEach(btn => {
    btn.addEventListener('click', getGenreMovies)
})










// Event-Listener
window.addEventListener('DOMContentLoaded', getGenres);

hamburgerMenu.addEventListener('click', openMenu);

movies.forEach(movie => {
    movie.addEventListener('click', openMovieInfo)
});

searchBar.addEventListener('keyup', fetchSearchedMovies)


// Functions



async function fetchSearchedMovies() {
    console.log(searchBar.value.length)

    if (searchBar.value.length >= 3) { searchResults.classList.add('show') } else {
        searchResults.classList.remove('show')
    }

    const req = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDBKey}&query=${searchBar.value}`);
    const res = await req.json();
    const arr = res.results;

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

        let searchCards = document.querySelectorAll('.search-card');

        searchCards.forEach(card => {
            card.addEventListener('click', openSearch)
        });


    } else {
        searchResults.innerHTML = 'Sorry nothing matches your serach...'
    }
}



async function getGenreMovies(e) {
    let genre = e.currentTarget.innerHTML;
    let genreID = e.currentTarget.attributes[2].nodeValue;
    let genreMoviesRes = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${TMDBKey}&language=en-US&sort_by=popularity.desc&with_genres=${genreID}`)
    let genreMoviesData = await genreMoviesRes.json();
    let genreMovies = await genreMoviesData.results;
    let genreNameDom = document.querySelector('.category-name');


    genreNameDom.innerHTML = await genre.toUpperCase();
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

    if (movieOverlay.classList.contains('open')) {
        closeMovieInfo();
    } else if (categoryBtnsContainer.classList.contains('open')) {
        categoryBtnsContainer.classList.remove('open')
    }

    const movies = document.querySelectorAll('.movie-card-filter');
    await movies.forEach(movie => {
        movie.addEventListener('click', openMovieInfo)
    });




}


function closeMovieInfo() {
    movieOverlay.classList.add('close');
    movieOverlay.classList.remove('open');
    movieOverlay.style.display = 'none';
    movieOverlay.classList.remove('close');
    movieList.style.display = 'block';
    movieList.style.opacity = '1';
};


function openMenu() {
    categoryBtnsContainer.classList.toggle('open')
};

async function getGenres() {

    const genresRes = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDBKey}`);
    const genreData = await genresRes.json();
    const fetchedGenres = genreData.genres;
    const genreBtns = fetchedGenres.map(genre => {
        return `<button class="btn"  data-category="${genre.name}" data-genreID="${genre.id}">${genre.name}</button>`
    }).join('');

    genreBtnsContainer.innerHTML = genreBtns;
    const genreBtn = document.querySelectorAll('.btn');

    genreBtn.forEach(btn => {
        btn.addEventListener('click', getGenreMovies)
    })
}


async function gatherInfo(data, rec, site, trailer) {
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
        <div class="movie-info-genre">${data.genres[0].name}</div>
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

async function openSearch(e) {
    console.log(e.currentTarget)

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
    // // Youtube Trailer property is videoId
    // // const movieTrailRes = await fetch(`https://imdb-api.com/en/API/YouTubeTrailer/${apiKey}/${imdbId}`);
    // // const movieTrail = await movieTrailRes.json();
    const simMovieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${TMDBKey}`);
    const simMovieData = await simMovieRes.json();
    const searchResults = document.querySelector('.search-results');
    const searchBar = document.querySelector('input');


    searchBar.value = "";
    searchResults.style.visibility = 'hidden';





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


async function openMovieInfo(e) {

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
    // Youtube Trailer property is videoId
    // const movieTrailRes = await fetch(`https://imdb-api.com/en/API/YouTubeTrailer/${apiKey}/${imdbId}`);
    // const movieTrail = await movieTrailRes.json();
    const simMovieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${TMDBKey}`);
    const simMovieData = await simMovieRes.json();




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











































