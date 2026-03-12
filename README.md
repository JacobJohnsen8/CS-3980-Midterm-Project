# CS-3980-Midterm-Project
# 🎬 Movie Watchlist App

## Overview

The **Movie Watchlist App** is a simple full-stack web application that allows users to manage and rank movies they want to watch or have already watched. The application uses a **FastAPI backend** with a **HTML/CSS/JavaScript frontend** and stores data in an in-memory list.

Users can add movies, edit existing entries, delete movies, and view their movies ranked automatically by rating.

This project demonstrates basic **CRUD operations**, API design, and frontend-backend communication.

---

## Features

The application includes the following functionality:

- Add a new movie to the watchlist
- View all movies in the list
- Edit movie information
- Delete movies from the list
- Automatically rank movies by rating
- Display leaderboard-style rank badges for the top movies
- Automatically load movies when the page opens
- Responsive layout with styled movie cards

---

## Technologies Used

### Backend
- Python
- FastAPI
- Uvicorn

### Frontend
- HTML
- CSS
- JavaScript (Fetch API)

### Development Tools
- Visual Studio Code
- GitHub

---

## Project Structure

movie-watchlist-app
│
├── main.py
├── index.html
├── style.css
├── script.js
├── requirements.txt
└── README.md


### File Descriptions

- **main.py** – FastAPI backend with CRUD endpoints  
- **index.html** – Main webpage for the application  
- **style.css** – Styling for the page and movie cards  
- **script.js** – Frontend logic and API requests  
- **requirements.txt** – Python dependencies  
- **README.md** – Project documentation  

---

## API Endpoints

The FastAPI backend provides the following routes:

### `GET /movies`
Returns the list of movies sorted by rating.

### `GET /movies/{id}`
Returns a specific movie by ID.

### `POST /movies`
Adds a new movie to the list.

### `PUT /movies/{id}`
Updates an existing movie.

### `DELETE /movies/{id}`
Deletes a movie from the list.

---

## Screen Shots of webpage
<img width="1574" height="764" alt="image" src="https://github.com/user-attachments/assets/f8f8e231-d75c-4752-84f8-43b207fdf0aa" />
<img width="1556" height="574" alt="image" src="https://github.com/user-attachments/assets/bafeb0a9-ef0e-4e86-8a1d-a8167249b3e4" />

