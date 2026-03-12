from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List


app = FastAPI()


class MovieCreate(BaseModel):
    title: str
    genre: str
    year: int
    watched: bool
    rating: float


class Movie(BaseModel):
    id: int
    title: str
    genre: str
    year: int
    watched: bool
    rating: float


movies: List[Movie] = [
    Movie(id=1, title="Inception", genre="Sci-Fi", year=2010, watched=True, rating=9.0),
    Movie(id=2, title="The Dark Knight", genre="Action", year=2008, watched=True, rating=9.5),
    Movie(id=3, title="Interstellar", genre="Sci-Fi", year=2014, watched=False, rating=0.0),
]


@app.get("/")
def read_root():
    return FileResponse("index.html")


@app.get("/style.css")
def get_css():
    return FileResponse("style.css")


@app.get("/script.js")
def get_js():
    return FileResponse("script.js")


@app.get("/movies")
async def get_movies():
    sorted_movies = sorted(movies, key=lambda movie: movie.rating, reverse=True)
    return sorted_movies


@app.get("/movies/{movie_id}")
async def get_movie(movie_id: int):
    for movie in movies:
        if movie.id == movie_id:
            return movie
    raise HTTPException(status_code=404, detail="Movie not found")


@app.post("/movies")
async def add_movie(movie_data: MovieCreate):
    new_id = max([movie.id for movie in movies], default=0) + 1

    new_movie = Movie(
        id=new_id,
        title=movie_data.title,
        genre=movie_data.genre,
        year=movie_data.year,
        watched=movie_data.watched,
        rating=movie_data.rating
    )

    movies.append(new_movie)
    return {"message": "Movie added successfully", "movie": new_movie}


@app.put("/movies/{movie_id}")
async def update_movie(movie_id: int, updated_movie_data: MovieCreate):
    for index, movie in enumerate(movies):
        if movie.id == movie_id:
            updated_movie = Movie(
                id=movie_id,
                title=updated_movie_data.title,
                genre=updated_movie_data.genre,
                year=updated_movie_data.year,
                watched=updated_movie_data.watched,
                rating=updated_movie_data.rating
            )
            movies[index] = updated_movie
            return {"message": "Movie updated successfully", "movie": updated_movie}
    raise HTTPException(status_code=404, detail="Movie not found")


@app.delete("/movies/{movie_id}")
async def delete_movie(movie_id: int):
    for index, movie in enumerate(movies):
        if movie.id == movie_id:
            deleted_movie = movies.pop(index)
            return {"message": "Movie deleted successfully", "movie": deleted_movie}
    raise HTTPException(status_code=404, detail="Movie not found")