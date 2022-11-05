

// Variables
const hamburgerMenu = document.querySelector('.hamburger-menu');
const categoryBtnsContainer = document.querySelector('.category-container');
const movies = document.querySelectorAll('.movie-card-filter');
const movieOverlay = document.querySelector('.movie-overlay');
const clsBtn = document.querySelector('.close-btn');
const movieList = document.querySelector('.movie-section-container');




// Event-Listener
hamburgerMenu.addEventListener('click', openMenu);
clsBtn.addEventListener('click', closeMovieInfo);

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

function openMovieInfo(e) {

    const movieName = e.currentTarget.querySelector('.movie-card').querySelector('.movie-info').querySelector('.movie-name').textContent;
    movieList.style.display = 'none';
    movieList.style.opacity = '0'
    movieOverlay.style.display = 'flex';
    movieOverlay.classList.add('open');
    window.scrollTo(0, 0);
    console.log(movieName);
}

