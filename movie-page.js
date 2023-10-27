// movie-page.js

const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const MOVIE_ID = 123; // Replace with the actual movie ID

function getMovieDetails(movieId) {
  const movieDetailsUrl = `${BASE_URL}/movie/${movieId}?${API_KEY}`;

  fetch(movieDetailsUrl)
    .then((response) => response.json())
    .then((data) => {
      const {
        title,
        release_date,
        genres,
        overview,
        poster_path,
        credits: { crew, cast },
      } = data;

      const movieTitle = document.querySelector('.movie-details h1');
      const releaseYear = document.querySelector('.movie-details p:nth-of-type(2)');
      const genre = document.querySelector('.movie-details p:nth-of-type(3)');
      const director = document.querySelector('.movie-details p:nth-of-type(4)');
      const starring = document.querySelector('.movie-details p:nth-of-type(5)');
      const plot = document.querySelector('.movie-details p:last-of-type');
      const poster = document.querySelector('.movie-details img');

      movieTitle.textContent = title;
      releaseYear.textContent = `Release Year: ${release_date.split('-')[0]}`;
      genre.textContent = `Genre: ${genres.map((genre) => genre.name).join(', ')}`;
      director.textContent = `Director: ${crew.find((person) => person.job === 'Director').name}`;
      starring.textContent = `Starring: ${cast.slice(0, 2).map((actor) => actor.name).join(', ')}`;
      plot.textContent = `Plot: ${overview}`;
      poster.src = `${IMG_URL}${poster_path}`;
    })
    .catch((error) => {
      console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const addToWatchlistButton = document.getElementById('add-to-watchlist');

  addToWatchlistButton.addEventListener('click', () => {
    // Your watchlist logic here
    console.log('Added to Watchlist');
  });

  // Fetch and display movie details
  getMovieDetails(MOVIE_ID);
});
