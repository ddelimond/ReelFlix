import { apiKey } from "./apiKey.js";
import { TMDBKey } from "./apiKey.js";


// Variables
const hamburgerMenu = document.querySelector('.hamburger-menu');
const categoryBtnsContainer = document.querySelector('.category-container');
const movies = document.querySelectorAll('.movie-card-filter');
const movieOverlay = document.querySelector('.movie-overlay');
const clsBtn = document.querySelector('.close-btn');
const movieList = document.querySelector('.movie-section-container');




// Event-Listener
hamburgerMenu.addEventListener('click', openMenu);
// clsBtn.addEventListener('click', closeMovieInfo);

movies.forEach(movie => {
    movie.addEventListener('click', openMovieInfo)
});


// Functions
function openMenu() {
    categoryBtnsContainer.classList.toggle('open')
};

function closeMovieInfo() {
    movieOverlay.classList.add('close');
    movieOverlay.classList.remove('open');
    movieOverlay.style.display = 'none';
    movieOverlay.classList.remove('close');
    movieList.style.display = 'block';
    movieList.style.opacity = '1';
};


async function openMovieInfo(e) {

    const id = e.currentTarget.querySelector('.movie-card').attributes[1].nodeValue;
    const movieName = e.currentTarget.querySelector('.movie-card').querySelector('.movie-info').querySelector('.movie-name').textContent;
    const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDBKey}`);
    const movieData = await movieRes.json();
    movieList.style.display = 'none';
    movieList.style.opacity = '0';
    const imdbRes = await fetch(`https://imdb-api.com/en/API/SearchMovie/${apiKey}/${movieName}`);
    const imdbData = await imdbRes.json();
    const imdbId = imdbData.results[0].id;
    const movieTrailRes = await fetch(`https://imdb-api.com/en/API/YouTubeTrailer/${apiKey}/${imdbId}`);
    const movieTrail = await movieTrailRes.json();
    const simMovieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${TMDBKey}`);
    const simMovieData = await simMovieRes.json();


    function gatherInfo() {
        return movieOverlay.innerHTML = `<div class="movie-details-container">
        <div class="details-btns">
            <a href="#" class="official-page">OFFICIAL PAGE</a>
            <button onclick="closeMovieInfo()" class="close-btn">
                <i class="fa-solid fa-circle-xmark"></i>
            </button>
        </div>
        <div class="movie-details">
            <div class="movie-poster">
                <img src="https://image.tmdb.org/t/p/w500/${movieData.poster_path}" alt="${movieData.title}-poster">
            </div>
            <div class="info">
                <h2 class="movie-info-name">${movieData.title}</h2>
                <h4 class="movie-info-release-date">Release date: ${movieData.release_date}</h4>
                <div class="movie-info-ratings">
                    <span>rating: ${movieData.vote_average} <i class="fa-solid fa-star"></i></span>
                    <span class="movie-info-votes">all votes: ${movieData.vote_count}</span>
                </div>
                <div class="movie-info-genre">${movieData.genres[0].name}</div>
                <div class="movie-info-plot">
                    <h4>${movieData.overview}</h4>
                </div>
            </div>
        </div>

        <div class="recommended">
        <div class="line"></div>
        <h3 class="rec-title">People who watched "${movieData.title}"also watch:</h3>
        <div class="rec-posters">
            ${simMovieData.results.map(poster => {
            return `<div onclick="openSimMovieInfo(e)" class="movie-rec-poster" data-id="${poster.id}" data-name="${poster.title}">
            <img src="https://image.tmdb.org/t/p/w500/${poster.poster_path}" alt="${poster.title}">
            </div>`}).join('')}
        </div>
    </div>
        
        <div class="trailer">
            <div class="line"></div>
            <h3 class="trailer-title">Trailer:</h3>
            <iframe src="https://www.youtube.com/embed/${movieTrail.videoId}"</iframe>
        
        </div>
        
    </div>`
    }
    await gatherInfo();
    const simMovies = document.querySelectorAll('.movie-rec-poster');

    simMovies.forEach(movie => {
        movie.addEventListener('click', openSimMovieInfo)
    });

    movieOverlay.style.display = 'flex';
    movieOverlay.classList.add('open');
    window.scrollTo(0, 0);

    console.log(id);
}


async function openSimMovieInfo(e) {
    const id = e.currentTarget.querySelector('.movie-rec-poster').attributes[1].nodeValue;
    const movieName = e.currentTarget.querySelector('.movie-rec-poster').attributes[2].nodeValue;
    const movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDBKey}`);
    const movieData = await movieRes.json();
    movieList.style.display = 'none';
    movieList.style.opacity = '0';
    const imdbRes = await fetch(`https://imdb-api.com/en/API/SearchMovie/${apiKey}/${movieName}`);
    const imdbData = await imdbRes.json();
    const imdbId = imdbData.results[0].id;
    const movieTrailRes = await fetch(`https://imdb-api.com/en/API/YouTubeTrailer/${apiKey}/${imdbId}`);
    const movieTrail = await movieTrailRes.json();
    const simMovieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${TMDBKey}`);
    const simMovieData = await simMovieRes.json();


    function gatherInfo() {
        return movieOverlay.innerHTML = `<div class="movie-details-container">
        <div class="details-btns">
            <a href="#" class="official-page">OFFICIAL PAGE</a>
            <button onclick="closeMovieInfo()" class="close-btn">
                <i class="fa-solid fa-circle-xmark"></i>
            </button>
        </div>
        <div class="movie-details">
            <div class="movie-poster">
                <img src="https://image.tmdb.org/t/p/w500/${movieData.poster_path}" alt="${movieData.title}-poster">
            </div>
            <div class="info">
                <h2 class="movie-info-name">${movieData.title}</h2>
                <h4 class="movie-info-release-date">Release date: ${movieData.release_date}</h4>
                <div class="movie-info-ratings">
                    <span>rating: ${movieData.vote_average} <i class="fa-solid fa-star"></i></span>
                    <span class="movie-info-votes">all votes: ${movieData.vote_count}</span>
                </div>
                <div class="movie-info-genre">${movieData.genres[0].name}</div>
                <div class="movie-info-plot">
                    <h4>${movieData.overview}</h4>
                </div>
            </div>
        </div>

        <div class="recommended">
        <div class="line"></div>
        <h3 class="rec-title">People who watched "${movieData.title}"also watch:</h3>
        <div class="rec-posters">
            ${simMovieData.results.map(poster => {
            return `<div onclick="openSimMovieInfo(e)" class="movie-rec-poster" data-id="${poster.id}" data-name="${poster.title}">
            <img src="https://image.tmdb.org/t/p/w500/${poster.poster_path}" alt="${poster.title}">
            </div>`}).join('')}
        </div>
    </div>
        
        <div class="trailer">
            <div class="line"></div>
            <h3 class="trailer-title">Trailer:</h3>
            <iframe src="https://www.youtube.com/embed/${movieTrail.videoId}"</iframe>
        
        </div>
        
    </div>`
    }
    await gatherInfo();
    const simMovies = document.querySelectorAll('.movie-rec-poster');

    simMovies.forEach(movie => {
        movie.addEventListener('click', openSimMovieInfo)
    });

    movieOverlay.style.display = 'flex';
    movieOverlay.classList.add('open');
    window.scrollTo(0, 0);

    console.log(id);
}



