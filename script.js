const movieForm = document.getElementById("movieForm");
const movieList = document.getElementById("movieList");
const formTitle = document.getElementById("formTitle");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");

let editingMovieId = null;

async function loadMovies() {
    movieList.innerHTML = "";

    const response = await fetch("/movies");
    const movies = await response.json();

    movies.forEach((movie, index) => {

        let badge = "";

        if (index === 0) {
            badge = `<span class="rank-badge gold">🥇 #1</span>`;
        } else if (index === 1) {
            badge = `<span class="rank-badge silver">🥈 #2</span>`;
        } else if (index === 2) {
            badge = `<span class="rank-badge bronze">🥉 #3</span>`;
        } else {
            badge = `<span class="rank-badge">#${index + 1}</span>`;
        }

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            ${badge}
            <p><strong>Title:</strong> ${movie.title}</p>
            <p><strong>Genre:</strong> ${movie.genre}</p>
            <p><strong>Year:</strong> ${movie.year}</p>
            <p><strong>Watched:</strong> ${movie.watched ? "Yes" : "No"}</p>
            <p><strong>Rating:</strong> ⭐ ${movie.rating}</p>
            <button class="edit-btn" onclick="editMovie(${movie.id})">Edit</button>
            <button class="delete-btn" onclick="deleteMovie(${movie.id})">Delete</button>
        `;

        movieList.appendChild(movieCard);
    });
}

movieForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const movieData = {
        title: document.getElementById("title").value,
        genre: document.getElementById("genre").value,
        year: parseInt(document.getElementById("year").value),
        watched: document.getElementById("watched").value === "true",
        rating: parseFloat(document.getElementById("rating").value)
    };

    let response;

    if (editingMovieId === null) {
        response = await fetch("/movies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieData)
        });
    } else {
        response = await fetch(`/movies/${editingMovieId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieData)
        });
    }

    if (response.ok) {
        alert(editingMovieId === null ? "Movie added successfully!" : "Movie updated successfully!");
        resetForm();
        loadMovies();
    } else {
        const errorData = await response.json();
        alert("Error: " + errorData.detail);
    }
});

async function deleteMovie(movieId) {
    const response = await fetch(`/movies/${movieId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        alert("Movie deleted successfully!");
        loadMovies();

        if (editingMovieId === movieId) {
            resetForm();
        }
    } else {
        alert("Could not delete movie.");
    }
}

async function editMovie(movieId) {
    const response = await fetch(`/movies/${movieId}`);
    const movie = await response.json();

    document.getElementById("title").value = movie.title;
    document.getElementById("genre").value = movie.genre;
    document.getElementById("year").value = movie.year;
    document.getElementById("watched").value = movie.watched.toString();
    document.getElementById("rating").value = movie.rating;

    editingMovieId = movieId;

    formTitle.textContent = "Edit Movie";
    submitBtn.textContent = "Update Movie";
    cancelEditBtn.style.display = "inline-block";
}

function resetForm() {
    movieForm.reset();
    editingMovieId = null;
    formTitle.textContent = "Add a Movie";
    submitBtn.textContent = "Add Movie";
    cancelEditBtn.style.display = "none";
}

cancelEditBtn.addEventListener("click", resetForm);

window.onload = loadMovies;