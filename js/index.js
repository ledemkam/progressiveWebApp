const form = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");

let search = "";
let movie = [];
const fectMovies = async () => {
  movies = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=Yourkeys&query=${search}`
  ).then((res) => res.json());
  console.log(movies);
};

const movieDisplay = async () => {
  await fectMovies();

  movies.results.length = 12;

  result.innerHTML = movies.results
    .map(
      (movie) =>
        `<li>
        <h2>${movie.original_title}</h2>
        <div className="card-content">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"></img>
            <div className="infos">
                <p>${movie.overview}</p>
                <p>Popularität :${movie.popularity} ⭐️</p>
            </div>
        </div>
    </li>
    `
    )
    .join("");
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  search = searchInput.value;
  movieDisplay();
});
