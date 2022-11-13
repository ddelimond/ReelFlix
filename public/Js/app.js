import { apiKey } from "./apiKey.js";
import { TMDBKey } from "./apiKey.js";


// Variables
const hamburgerMenu = document.querySelector('.hamburger-menu');
const categoryBtnsContainer = document.querySelector('.category-container');
const movies = document.querySelectorAll('.movie-card-filter');
const movieOverlay = document.querySelector('.movie-overlay');
const clsBtn = document.querySelector('.close-btn');
const movieList = document.querySelector('.movie-section-container');
const genreBtnsContainer = document.querySelector('.btn-container')
const genreBtns = document.querySelectorAll('.btn');

// function getGenreMovies(e) {
//     console.log('hello')
// }









// Event-Listener
window.addEventListener('DOMContentLoaded', getGenres);

hamburgerMenu.addEventListener('click', openMenu);
// clsBtn.addEventListener('click', closeMovieInfo);

movies.forEach(movie => {
    movie.addEventListener('click', openMovieInfo)
});

genreBtns.forEach(btn => {
    btn.addEventListener('click', function getGenreMovies(e) {
        console.log('hello')
        console.log(e)
    })
});


// Functions

function openMenu() {
    categoryBtnsContainer.classList.toggle('open')
};

async function getGenres() {

    const genresRes = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDBKey}`);
    const genreData = await genresRes.json();
    const fetchedGenres = genreData.genres;
    const genreBtns = fetchedGenres.map(genre => {
        return `<button class="btn"  data-category="${genre.name}">${genre.name}</button>`
    }).join('');

    genreBtnsContainer.innerHTML = genreBtns;
}


async function gatherInfo(data, rec, site, trailer) {
    return movieOverlay.innerHTML = `<div class="movie-details-container">
<div class="details-btns">
    <a href="${site}" target="_blank" class="official-page">OFFICIAL PAGE</a>
    <button onclick="closeMovieInfo()" class="close-btn">
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

    movieList.style.display = 'none';
    movieList.style.opacity = '0';
    movieOverlay.style.display = 'flex';
    movieOverlay.classList.add('open');
    window.scrollTo(0, 0);

}









































