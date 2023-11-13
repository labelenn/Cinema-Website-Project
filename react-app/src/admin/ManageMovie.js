import '../App.css';
import React, { useEffect, useState } from 'react';
import { updateMovie, createMovie, getMovies } from '../data/GraphQLRepo';
import { useNavigate, useLocation } from 'react-router-dom';


function ManageMovie(props) {
    const [movies, setMovies] = useState([]);
    const location = useLocation();
    const data = location.state;
    const navigate = useNavigate();

    const [fields, setFields] = useState({ name: data.name, director: data.director, plot: data.plot, year: data.yearReleased });
    const [movieEditPrompt, setMovieEditPrompt] = useState("");

    useEffect(() => {
        async function fetchData() {
            const data = await getMovies();
            setMovies(data.all_movies);
        }
        fetchData();
    }, []);

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        const temp = { name: fields.name, director: fields.director, plot: fields.plot, year: fields.year };

        // Update field and state.
        temp[name] = value;
        setFields(temp);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (data.movieID === 0) {
            let moviedata = {
                movieID: movies.length + 1,
                name: fields.name,
                director: fields.director,
                plot: fields.plot,
                yearReleased: fields.year,
            };

            createMovie(moviedata);
            setMovieEditPrompt("Movie added. Redirecting to dashboard.")
            setTimeout(navigate, 2000, "/admin");
        }

        else {

            let moviedata = {
                movieID: data.movieID,
                name: fields.name,
                director: fields.director,
                plot: fields.plot,
                yearReleased: fields.year,
            };

            updateMovie(moviedata);
            setMovieEditPrompt("Movie edited. Redirecting to dashboard.")
            setTimeout(navigate, 2000, "/admin");
        }
    }
  
    return (
        <div className = "admin-manage">
            <h1 style = {{"text-align": "center", "padding": "20px"}}>Manage Movie</h1>

            <form className = "account-form" onSubmit = {handleSubmit}>
                <div className = "form-group">
                    <label htmlFor = "moviename" className = "control-label">Name</label>
                    <input type = "moviename" id = "name" className = "form-control" name = "name" placeholder = "Movie name"
                    value = {fields.name} onChange={handleInputChange}/>
                </div>
                <div className = "form-group">
                    <label htmlFor = "director" className = "control-label">Director</label>
                    <input type = "director" id = "director" className = "form-control" name = "director" placeholder = "Director"
                    value = {fields.director} onChange={handleInputChange}/>
                </div>
                <div className = "form-group">
                    <label htmlFor = "plot" className = "control-label">Plot</label>
                    <input type = "plot" id = "plot" className = "form-control" name = "plot" placeholder = "Movie plot"
                    value = {fields.plot} onChange={handleInputChange}/>
                </div>
                <div className = "form-group">
                    <label htmlFor = "year" className = "control-label">Year Released</label>
                    <input type = "year" name = "year" id = "year" className = "form-control" placeholder = "Year" 
                    value = {fields.year} onChange={handleInputChange}/>
                </div>

                {data.movieID === 0 ?
                <div className = "form-group">
                    <input type = "submit" className = "btn btn-primary" value = "Add"/>
                </div>
                :
                <div className = "form-group">
                    <input type = "submit" className = "btn btn-primary" value = "Submit"/>
                </div>
                }
                
            </form>

            <p style = {{"text-align": "center", "padding-top": "20px"}}>{movieEditPrompt}</p>
            
        </div> 
    );
}
export default ManageMovie;