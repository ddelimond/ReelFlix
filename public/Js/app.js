import { apiKey } from "./apiKey.js";


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
    const movieRes = await fetch(`https://imdb-api.com/en/API/Title/${apiKey}/${id}/Trailer`);
    const movieData = await movieRes.json();
    movieList.style.display = 'none';
    movieList.style.opacity = '0'
    const movieTrailRes = await fetch(`https://imdb-api.com/en/API/YouTubeTrailer/${apiKey}/${id}`);
    const movieTrail = await movieTrailRes.json();
    movieOverlay.innerHTML = `<div class="movie-details-container">
<div class="details-btns">
    <a href="#" class="official-page">OFFICIAL PAGE</a>
    <button onclick="closeMovieInfo()" class="close-btn">
        <i class="fa-solid fa-circle-xmark"></i>
    </button>
</div>
<div class="movie-details">
    <div class="movie-poster">
        <img src="${movieData.image}" alt="${movieData.title}-poster">
    </div>
    <div class="info">
        <h2 class="movie-info-name">${movieData.title}</h2>
        <h4 class="movie-info-release-date">Release date: ${movieData.releaseDate}</h4>
        <div class="movie-info-ratings">
            <span>rating: ${movieData.imDbRating} <i class="fa-solid fa-star"></i></span>
            <span class="movie-info-votes">all votes: ${movieData.imDbRatingVotes}</span>
        </div>
        <div class="movie-info-genre">${movieData.genreList.map(obj => { return Object.keys(obj) })[0]}</div>
        <div class="movie-info-plot">
            <h4>${movieData.plot}</h4>
        </div>
    </div>
</div>

<div class="trailer">
    <div class="line"></div>
    <h3 class="trailer-title">Trailer:</h3>
    <iframe src="https://www.youtube.com/embed/${movieTrail.videoId}"</iframe>

</div>
<div class="recommended">
    <div class="line"></div>
    <h3 class="rec-title">People who watched "${movieData.title}"
        also watch:</h3>
    <div class="rec-posters">
     
    </div>
</div>
</div>`

    // ${movieData.similars.forEach(movie => {
    //     `<div class="movie-rec-poster">
    // <img src="${movie.image}" alt="${movie.title}-poster">
    // </div>`}).join('')}  


    movieOverlay.style.display = 'flex';
    movieOverlay.classList.add('open');
    window.scrollTo(0, 0);

    console.log(movieData);
}



