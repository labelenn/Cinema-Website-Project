import '../App.css';
import React, { useEffect, useState } from 'react';
import { updateUser, updateReview } from '../data/GraphQLRepo';
import { useNavigate, useLocation } from 'react-router-dom';

function Manage(props) {
    const [users, setUsers] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [movies, setMovies] = useState([]);
    const [prompt, setPrompt] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;

    // Get data from database
    useEffect(() => {
        if (data.feature === 1) {
            setUsers(data.users);
        } else if (data.feature === 2) {
            setReviews(data.reviews);
        } else if (data.feature === 3) {
            setMovies(data.movies);
        }
    }, []);

    // For managing users
    const manageUser = (e, feature, user, option) => {
        
        let userdata = {
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password,
            adminBlocked: user.adminBlocked,
            loggedIn: user.loggedIn,
        };

        if (option === 1) {
            userdata.adminBlocked = false;
            setPrompt("User unblocked. Redirecting to dashboard.");
        } 
        
        else if (option === 2) {
            userdata.adminBlocked = true;
            setPrompt("User blocked. Redirecting to dashboard.");
        }

        updateUser(userdata);
        setTimeout(navigate, 2000, "/admin");
        
    }

    // For managing reviews
    const manageReview = (e, feature, review, option) => {
        
        let reviewdata = {
            reviewID: review.reviewID,
            review: review.review,
            stars: review.stars,
            email: review.email,
            movieID: review.movieID,
            adminDeleted: review.adminDeleted
        };

        if (option === 1) {
            reviewdata.adminDeleted = true;
            setPrompt("Review deleted. Redirecting to dashboard.");
        }

        else if (option === 2) {
            reviewdata.adminDeleted = false;
            setPrompt("Review recovered. Redirecting to dashboard.");
        }

        updateReview(reviewdata);
        setTimeout(navigate, 2000, "/admin");
    }

    // For managing movies
    const manageMovie = (e, feature, movie) => {
        if (movie === null) {
            const data = {
                movieID: 0,
                name: "",
                director: "",
                plot: "",
                yearReleased: "",
            }
            navigate("/manage-movie", {state: data});
        }

        else {
            const data = {
                movieID: movie.movieID,
                name: movie.name,
                director: movie.director,
                plot: movie.plot,
                yearReleased: movie.yearReleased,
            }
            navigate("/manage-movie", {state: data});
        }
    }
  
    return (
        <div className = "admin-manage">
            <h1 style = {{"text-align": "center"}}>Manage</h1>
            {data.feature === 1 && <h2 style = {{"text-align": "center", "padding": "20px"}}>Users</h2>}
            {data.feature === 2 && <h2 style = {{"text-align": "center", "padding": "20px"}}>Reviews</h2>}
            {data.feature === 3 && <h2 style = {{"text-align": "center", "padding": "20px"}}>Movies</h2>}
            <div className = "admin-manage-content">
                {data.feature === 1 && users.map((user) => (
                    <ul>
                        <li key={user.email}>
                            <p>First Name: {user.firstname}</p>
                            <p>Last Name: {user.lastname}</p>
                            <p>Email: {user.email}</p>
                            {user.adminBlocked ? <p>User Blocked: True</p> : <p>User Blocked: False</p>}
                            <div className = "dashboard-manage-button-group">
                                <div className = "dashboard-manage-button">
                                    <input onClick = {(e) => manageUser(e, 1, user, 2)} type = "admin-manage" className = "btn btn-primary" value = "block" readOnly/>
                                </div>
                                <div className = "dashboard-manage-button">
                                    <input onClick = {(e) => manageUser(e, 1, user, 1)} type = "admin-manage" className = "btn btn-primary" value = "unblock" readOnly/>
                                </div>      
                            </div>
                       </li>     
                    </ul>
                ))}
                {data.feature === 2 && reviews.map((review) => (
                    <ul>
                        <li key={review.reviewID}>
                            <p>Review ID: {review.reviewID}</p>
                            <p>Movie ID: {review.movieID}</p>
                            <p>Rating: {review.stars}</p>
                            <p>Review: {review.review}</p>  
                            {review.adminDeleted ? <p>Review Deleted: True</p> : <p>Review Deleted: False</p>}
                            <div className = "dashboard-manage-button-group">
                                <div className = "dashboard-manage-button">
                                    <input onClick = {(e) => manageReview(e, 2, review, 1)} type = "admin-manage" className = "btn btn-primary" value = "delete" readOnly/> 
                                </div>
                                <div className = "dashboard-manage-button">
                                    <input onClick = {(e) => manageReview(e, 2, review, 2)} type = "admin-manage" className = "btn btn-primary" value = "recover" readOnly/> 
                                </div>
                            </div>
                        </li>
                    </ul>
                ))}
                {data.feature === 3 && 
                    <div className = "dashboard-manage-button">
                        <input onClick = {(e) => manageMovie(e, 3, null)} type = "admin-manage" className = "btn btn-primary" value = "add" readOnly/> 
                    </div>
                }
                {data.feature === 3 && 
                movies.map((movie) => (
                    <ul>
                        <li key={movie.movieID}>
                            <p>Name: {movie.name}</p>
                            <p>Year Released: {movie.yearReleased}</p>
                            <p>Director by: {movie.director}</p>
                            <p>Plot: {movie.plot}</p>
                            <div className = "dashboard-manage-button">
                                <input onClick = {(e) => manageMovie(e, 3, movie)} type = "admin-manage" className = "btn btn-primary" value = "edit" readOnly/> 
                            </div>
                        </li>   
                    </ul>
                ))}

                <p>{prompt}</p>
            </div>
        </div> 
    );
}
export default Manage;