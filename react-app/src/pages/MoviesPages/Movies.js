import '../../App.css';
import avengers from '../../images/avengers.jpg';
import blackpanther from '../../images/black panther.jpg';
import oppenheimer from '../../images/oppenheimer.jpg';
import barbie from '../../images/barbie.jpg';
import serendipity from '../../images/serendipity.jpg';
import thenotebook from '../../images/the notebook.jpg';
import topgun from '../../images/top gun maverick.jpg';
import granturismo from '../../images/gran turismo.jpg';
import UsersDataservice from '../../services/UsersService';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { getMovies } from '../../data/GraphQLRepo'

function Movies() {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const movieImg = {
        1: oppenheimer,
        2: barbie,
        3: granturismo,
        4: topgun,
        5: thenotebook,
        6: serendipity,
        7: blackpanther,
        8: avengers
    }

    // Get all movies from database
    useEffect(() => {
        async function fetchData() {
            const response = await getMovies();
            setMovies(response.all_movies);
        }
        fetchData();
    }, []);

    // Handle movie click, redirect to movie info page
    const handleMovieClick = (movieID, e) => {
        const data = {
            movieID: movieID
        }
        navigate('/movieinfo', {state: data});
    }

    return (
        <div>
            <div className = 'movies'>
                {movies.map((movie) => (
                    <div className = 'movie-item'>
                        {movie.movieID === 1 && <img onClick = {(e) => handleMovieClick(movie.movieID, e)} src = {oppenheimer} alt = "oppenheimer" border = "0"></img>}
                        {movie.movieID === 2 && <img onClick = {(e) => handleMovieClick(movie.movieID, e)} src = {barbie} alt = "barbie" border = "0"></img>}
                        {movie.movieID === 3 && <img onClick = {(e) => handleMovieClick(movie.movieID, e)} src = {granturismo} alt = "gran turismo" border = "0"></img>}
                        {movie.movieID === 4 && <img onClick = {(e) => handleMovieClick(movie.movieID, e)} src = {topgun} alt = "top gun maverick" border = "0"></img>}
                        {movie.movieID === 5 && <img onClick = {(e) => handleMovieClick(movie.movieID, e)} src = {thenotebook} alt = "the notebook" border = "0"></img>}
                        {movie.movieID === 6 && <img onClick = {(e) => handleMovieClick(movie.movieID, e)} src = {serendipity} alt = "serendipity" border = "0"></img>}
                        {movie.movieID === 7 && <img onClick = {(e) => handleMovieClick(movie.movieID, e)} src = {blackpanther} alt = "black panther" border = "0"></img>}
                        {movie.movieID === 8 && <img onClick = {(e) => handleMovieClick(movie.movieID, e)} src = {avengers} alt = "the avengers" border = "0"></img>}
                        <div className = 'movie-details'>
                            <h2>{movie.name}</h2>
                            <p>Release Date: {movie.yearReleased}</p>
                            <p>Director: {movie.director}</p>
                        </div>
                    </div>
                ))}
        
            </div>
        </div>
    );
}
  
export default Movies;