import '../../App.css';
import avengers from '../../images/avengers.jpg';
import blackpanther from '../../images/black panther.jpg';
import oppenheimer from '../../images/oppenheimer.jpg';
import barbie from '../../images/barbie.jpg';
import serendipity from '../../images/serendipity.jpg';
import thenotebook from '../../images/the notebook.jpg';
import topgun from '../../images/top gun maverick.jpg';
import granturismo from '../../images/gran turismo.jpg';
import seat from '../../images/armchair.png';
import seatselected from '../../images/armchair-selected.png';
import UsersDataservice from '../../services/UsersService';
import MoviesDataservice from '../../services/MoviesService';
import SessionsDataService from '../../services/SessionsService';
import ReservationsDataService from '../../services/ReservationsService';
import { useEffect, useState } from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

function Reservation() {
    const [loggedInUser, setLoggedIn] = useState(null);
    const [movieImg, setMovieImg] = useState(null);
    const [movieName, setMovieName] = useState(null);
    const [movieDirector, setMovieDirector] = useState(null);
    const [movieReleaseDate, setMovieReleaseDate] = useState(null);
    const [moviePlot, setMoviePlot] = useState(null);
    const [sessionTime, setSessionTime] = useState(null);
    const [sessionSeats, setSessionSeats] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState({1: seat, 2: seat, 3: seat, 4: seat, 5: seat, 6: seat, 7: seat, 8: seat, 9: seat, 10: seat});
    const [numSeats, setNumSeats] = useState(0);
    const [seatSelected, setSeatSelected] = useState(false);
    const [successfulMessage, setSuccessfulMessage] = useState(null);
    const [unsuccessfulMessage, setUnsuccessfulMessage] = useState(null);
    const [reserveClicked, setReserveClicked] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const movieID = data.movieID;
    const sessionID = data.sessionID;
    
    useEffect(() => {
        // Get logged in user data
        async function fetchData() {
            const response = await UsersDataservice.loggedInUser();
            if (response.data.length !== 0) {
                setLoggedIn(response.data[0]);
            }

            const sessionResponse = await SessionsDataService.get(sessionID);
            console.log(sessionResponse.data);
            setSessionTime(sessionResponse.data.time);
            setSessionSeats(sessionResponse.data.availableSeats);
            

            const movieResponse = await MoviesDataservice.get(movieID);
            console.log(movieResponse.data);
            setMovieDirector(movieResponse.data.director);
            setMovieReleaseDate(movieResponse.data.yearReleased);
            setMoviePlot(movieResponse.data.plot);
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

    // Function to handle seat icon selection
    const handleSeatClick = (e, numSeats) => {
        if (!reserveClicked) {
            setSeatSelected(true);
        }
        
        const temp = {...selectedSeats};
        for (let i = 1; i <= 10; i++) {
            temp[i] = seat;
        }
        switch (numSeats) {
            case 1:    
                temp[1] = seatselected;
                setSelectedSeats(temp);
                setNumSeats(1);
                break;
            case 2:
                for (let i = 1; i <= 2; i++) {
                    temp[i] = seatselected;
                }
                setSelectedSeats(temp);
                setNumSeats(2);
                break;
            case 3:
                for (let i = 1; i <= 3; i++) {
                    temp[i] = seatselected;
                }
                setSelectedSeats(temp);
                setNumSeats(3);
                break;
            case 4:
                for (let i = 1; i <= 4; i++) {
                    temp[i] = seatselected;
                }
                setSelectedSeats(temp);
                setNumSeats(4);
                break;
            case 5:
                for (let i = 1; i <= 5; i++) {
                    temp[i] = seatselected;
                }
                setSelectedSeats(temp);
                setNumSeats(5);
                break;
            case 6:
                for (let i = 1; i <= 6; i++) {
                    temp[i] = seatselected;
                }
                setSelectedSeats(temp);
                setNumSeats(6);
                break;
            case 7:
                for (let i = 1; i <= 7; i++) {
                    temp[i] = seatselected;
                }
                setSelectedSeats(temp);
                setNumSeats(7);
                break;
            case 8:
                for (let i = 1; i <= 8; i++) {
                    temp[i] = seatselected;
                }
                setSelectedSeats(temp);
                setNumSeats(8);
                break;
            case 9:
                for (let i = 1; i <= 9; i++) {
                    temp[i] = seatselected;
                }
                setSelectedSeats(temp);
                setNumSeats(9);
                break;
            case 10:
                for (let i = 1; i <= 10; i++) {
                    temp[i] = seatselected;
                }
                setSelectedSeats(temp);
                setNumSeats(10);
                break;
            default:
                for (let i = 1; i <= 10; i++) {
                    temp[i] = seat;
                }
                setSelectedSeats(temp);
                setNumSeats(10);
                break;
            }
    }

    const handleReserveClick = (e) => {
        e.preventDefault();
        setReserveClicked(true);
        setSeatSelected(false);

    }

    const handleReserveConfirmation = (e, confirmed) => {
        e.preventDefault();

        // If user clicks no, reset selected seats
        if (!confirmed) {
            const temp = {...selectedSeats};
            for (let i = 1; i <= 10; i++) {
                temp[i] = seat;
            }
            setSelectedSeats(temp);
            setSeatSelected(false)
            setNumSeats(0);
            setReserveClicked(false);
            return;
        }

        // Else proceed with reservation request
        // Get selected session's data
        SessionsDataService.get(sessionID)
        .then(response => {

            // Check if there are enough seats for the request
            if (response.data.availableSeats >= numSeats) {
                const data = {
                    seats: numSeats,
                    time: sessionTime,   
                    email: loggedInUser.email,            
                    movieID: movieID,
                }

                ReservationsDataService.create(data)
                    .then(response => {
                        console.log(response.data);
                        setSuccessfulMessage("Reservation successful. Redirecting to My Reservations page.")
                        setTimeout(navigate, 2000, '/my-reservations');
                    })
                    .catch(e => {
                        console.log(e);
                    });
                
                // Update session's available seats
                const sessionData = {
                    sessionID: sessionID,
                    time: response.data.time,
                    availableSeats: response.data.availableSeats - numSeats,
                }

                SessionsDataService.update(sessionID, sessionData)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }

            // If not enough seats
            else { 
                const temp = {...selectedSeats};
                for (let i = 1; i <= 10; i++) {
                    temp[i] = seat;
                }
                setSelectedSeats(temp);
                setSeatSelected(false)
                setNumSeats(0);
                setReserveClicked(false);
                setUnsuccessfulMessage("Not enough seats available for your request.");
            }      
        })
    }

    return (
        <div>
            <div className = 'reservation-page'>
                <div className = 'reservation-header'>
                    <h1>Ticket Reservation</h1>
                </div>
                <div className = "reservation-content">
                    <div className = "reservation-movie-img">
                        <img src = {movieImg} alt = {movieName}></img>
                    </div>
                    <div className = "reservation-movie-info">
                        <h3>Director</h3><p>{movieDirector}</p>
                        <h3>Release Date</h3><p>{movieReleaseDate}</p>
                        <h3>Plot</h3><p>{moviePlot}</p>
                    </div>
                    <div className = "reservation-movie-sessions">
                        <p>Session Time: {sessionTime}</p>
                        <p>Available Seats: {sessionSeats}</p>
                        <p>Select the number of seats for your reservation.</p>
                        <div className = "seat-count-selection">
                            <ul>
                                <li><div className = "seat-icons">  
                                    <img onClick = {(e) => handleSeatClick(e,1)} src = {selectedSeats[1]} alt = "seat"></img>
                                    <img onClick = {(e) => handleSeatClick(e,2)} src = {selectedSeats[2]} alt = "seat"></img>
                                    <img onClick = {(e) => handleSeatClick(e,3)} src = {selectedSeats[3]} alt = "seat"></img>
                                    <img onClick = {(e) => handleSeatClick(e,4)} src = {selectedSeats[4]} alt = "seat"></img>
                                    <img onClick = {(e) => handleSeatClick(e,5)} src = {selectedSeats[5]} alt = "seat"></img>
                                </div></li>
                                <li><div className = "seat-icons">
                                    <img onClick = {(e) => handleSeatClick(e,6)} src = {selectedSeats[6]} alt = "seat"></img>
                                    <img onClick = {(e) => handleSeatClick(e,7)} src = {selectedSeats[7]} alt = "seat"></img>
                                    <img onClick = {(e) => handleSeatClick(e,8)} src = {selectedSeats[8]} alt = "seat"></img>
                                    <img onClick = {(e) => handleSeatClick(e,9)} src = {selectedSeats[9]} alt = "seat"></img>
                                    <img onClick = {(e) => handleSeatClick(e,10)} src = {selectedSeats[10]} alt = "seat"></img>
                                </div></li>
                            </ul>
                        </div>
                        {/* DISPLAY NUMBER OF SEATS SELECTED */}
                        {numSeats === 0 ?
                            null
                            :
                            numSeats === 1 ?
                                <p>{numSeats} Seat</p>
                                :
                                <p>{numSeats} Seats</p>
                        }

                        {/* DISPLAY RESERVE BUTTON */}
                        {seatSelected ? 
                            <div className = "reservation-button">
                                <button onClick = {(e) => handleReserveClick(e)}>Reserve</button>     
                            </div>
                            :
                            null
                        }

                        {/* DISPLAY CONFIRMATION TO RESERVE BUTTON */}
                        {reserveClicked ? 
                            numSeats === 1 ?    
                                <>
                                    <p>Reserve {numSeats} seat to watch {movieName} at {sessionTime}?</p>                                
                                    <div className = "reservation-button">
                                        <button onClick = {(e) => handleReserveConfirmation(e, true)}>Yes</button>     
                                    </div>

                                    <div className = "reservation-button">
                                        <button onClick = {(e) => handleReserveConfirmation(e, false)}>No</button>     
                                    </div>
                                </>
                                :
                                <>
                                    <p>Reserve {numSeats} seats to watch {movieName} at {sessionTime}?</p>
                                    <div className = "reservation-button">
                                        <button onClick = {(e) => handleReserveConfirmation(e, true)}>Yes</button>     
                                        <button onClick = {(e) => handleReserveConfirmation(e, false)}>No</button>     
                                    </div>
                                </>   
                            :
                            null
                        }
                        {successfulMessage !== null ? 
                            <p style = {{"color": "green"}}>Reservation successful<br></br>Redirecting to My Reservations</p>     
                            :
                            null
                        }
                        {unsuccessfulMessage !== null ? 
                            <span className = "text-danger">{unsuccessfulMessage}</span>     
                            :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}
  
export default Reservation;