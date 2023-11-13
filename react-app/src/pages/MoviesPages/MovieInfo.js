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
import MoviesDataservice from '../../services/MoviesService';
import SessionsDataService from '../../services/SessionsService';
import { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

function MovieInfo() {
    const [loggedInUser, setLoggedIn] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [movieImg, setMovieImg] = useState(null);
    const [movieName, setMovieName] = useState(null);
    const [movieDirector, setMovieDirector] = useState(null);
    const [movieReleaseDate, setMovieReleaseDate] = useState(null);
    const [moviePlot, setMoviePlot] = useState(null);
    const [firstSessionFull, setFirstSessionFull] = useState(false);
    const [firstSessionSeats, setFirstSessionSeats] = useState(null);
    const [secondSessionFull, setSecondSessionFull] = useState(false);
    const [secondSessionSeats, setSecondSessionSeats] = useState(null);
    const [thirdSessionFull, setThirdSessionFull] = useState(false);
    const [thirdSessionSeats, setThirdSessionSeats] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const movieID = data.movieID;

    useEffect(() => {
        // Get Data
        async function fetchData() {
            const response = await UsersDataservice.loggedInUser();
            if (response.data.length !== 0) {
                setLoggedIn(response.data[0]);
            }

            const movieResponse = await MoviesDataservice.get(movieID);
            console.log(movieResponse.data);
            setMovieDirector(movieResponse.data.director);
            setMovieReleaseDate(movieResponse.data.yearReleased);
            setMoviePlot(movieResponse.data.plot);

            SessionsDataService.get(parseInt(movieID + "1"))
                .then(response => {
                    if (response.data.availableSeats === 0) {
                        setFirstSessionFull(true);
                    }
                    else {
                        setFirstSessionSeats(response.data.availableSeats);
                    }
                })
                .catch(error => {
                    console.log(error);
                });

            SessionsDataService.get(parseInt(movieID + "2"))
                .then(response => {
                    if (response.data.availableSeats === 0) {
                        setSecondSessionFull(true);
                    }
                    else {
                        setSecondSessionSeats(response.data.availableSeats);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            
            SessionsDataService.get(parseInt(movieID + "3"))
                .then(response => {
                    if (response.data.availableSeats === 0) {
                        setThirdSessionFull(true);
                    }
                    else {
                        setThirdSessionSeats(response.data.availableSeats);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
        fetchData();

        // Get movie
        switch (movieID) {
            case 1:
                setMovieImg(oppenheimer);
                setMovieName("Oppenheimer");
                break;
            case 2:
                setMovieImg(barbie);
                setMovieName("Barbie");
                break;
            case 3:
                setMovieImg(granturismo);
                setMovieName("Gran Turismo");
                break;
            case 4:
                setMovieImg(topgun);
                setMovieName("Top Gun Maverick");
                break;
            case 5:
                setMovieImg(thenotebook);
                setMovieName("The Notebook");
                break;
            case 6:
                setMovieImg(serendipity);
                setMovieName("Serendipity");
                break;
            case 7:
                setMovieImg(blackpanther);
                setMovieName("Black Panther");
                break;
            case 8:
                setMovieImg(avengers);
                setMovieName("The Avengers");
                break;
            default:
                setMovieImg(null);
                setMovieName(null);
                break;
        }

    }, []);

    const handleSessionClick = (e, session) => {
        let sessionID = movieID + session;

        // If user is logged in, navigate to reservation page
        if (loggedInUser !== null) {
            setErrorMsg(null);
            const data = {
                movieID: movieID,
                sessionID: parseInt(sessionID),
            }
            navigate('/reservation', {state: data});
        }

        else {
            setErrorMsg("Please sign in to your account to reserve a ticket.");
        }
    }
    

    return (
        <div>
            <div className = 'movie-info-page'>
                <div className = 'movie-info-header'>
                    <h1>Ticket Reservation</h1>
                </div>
                <div className = "movie-info-content">
                    <div className = "movie-info-movie-img">
                        <img src = {movieImg} alt = {movieName}></img>
                    </div>
                    <div className = "movie-info-details">
                        <h2>{movieName}</h2>
                        <h3>Director</h3><p>{movieDirector}</p>
                        <h3>Release Date</h3><p>{movieReleaseDate}</p>
                        <h3>Plot</h3><p>{moviePlot}</p>
                    </div>
                    <div className = "movie-info-movie-sessions">
                        {loggedInUser !== null ? null : <p>Sign in to your account to reserve a ticket for one of the sessions below.</p>}
                        <h3>Session Times:</h3>
                        <ul>
                            {firstSessionFull ? null:<li><button onClick = {(e) => handleSessionClick(e, "1")}>2:00 PM<br></br>Seats Available: {firstSessionSeats}</button></li>}
                            {secondSessionFull ? null:<li><button onClick = {(e) => handleSessionClick(e, "2")}>6:00 PM<br></br>Seats Available: {secondSessionSeats}</button></li>}
                            {thirdSessionFull ? null:<li><button onClick = {(e) => handleSessionClick(e, "3")}>9:00 PM<br></br>Seats Available: {thirdSessionSeats}</button></li>}
                        </ul>
                        {errorMsg !== null ? <span className = "text-danger">{errorMsg}</span> : null}
                    </div>
                </div>
            </div>
        </div>

    );
}
  
export default MovieInfo;