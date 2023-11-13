import '../App.css';
import React, { useEffect, useState } from 'react';
import { getMovies } from '../data/GraphQLRepo';
import { useNavigate } from 'react-router-dom';

function DashboardMovies(props) {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    // Get all movies from database
    useEffect(() => {
        async function fetchData() {
            const movies = await getMovies();
            setMovies(movies.all_movies);
        }
        fetchData();
    }, []);

    console.log(movies);

    // Handle manage button click, redirect to manage page
    const handleManage = (e, feature, movies) => {
        e.preventDefault();

        const data = {
            movies: movies,
            feature: feature
        }

        navigate('/manage', {state: data});
    }
  
    return (
        <div className = "admin-dashboard-column">
            <div className="admin-dashboard-movies">
                <div className = "dashboard-column-content">
                    <h2 id = "dashboard-column-heading">Movies</h2>
                    {movies.map((movie) => (
                        <ul>
                            <li key={movie.movieID}>
                                <div className = "dashboard-review-heading">
                                    <p>Name: {movie.name}</p>
                                    <p>Year Released: {movie.yearReleased}</p>
                                </div>
                                <p>Director by: {movie.director}</p>
                                <p>Plot: {movie.plot}</p>
                            </li>
                        </ul>
                    ))}
                </div>
            </div> 
            <div className = "dashboard-manage-button">
                <input onClick = {(e) => handleManage(e, 3, movies)} type = "admin-manage" className = "btn btn-primary" value = "manage" readOnly/> 
            </div>
        </div>
    );
}
export default DashboardMovies;