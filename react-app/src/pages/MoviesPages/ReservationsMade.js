import '../../App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReservationsDataService from "../../services/ReservationsService";
import UsersDataService from "../../services/UsersService";

function ReservationsMade() {
    const [reservations, setReservations] = useState([]);
    const [noReservations, setNoReservations] = useState(true);
    const [userEmail, setUserEmail] = useState(null);
    
    useEffect (() => {
        async function fetchData() {
            const response = await ReservationsDataService.getAll();
            setReservations(response.data);
            console.log(response.data);

            console.log(response.data.length);
            if (response.data.length !== 0) {
                console.log("No reservations");
                setNoReservations(false);
            }
            
            const userResponse = await UsersDataService.loggedInUser();
            setUserEmail(userResponse.data[0].email);
        }
        fetchData();
    }, []);
  

    return (
        <div className = "reservations-list">
          <h1>My Reservations</h1>
            {noReservations === true ? <h3>You have no reservations :(</h3> : null}
                {reservations.map((reservation, index) => 
                (
                  reservation.email === userEmail &&
                  <>
                  <hr></hr>
                  <li key = {index}> 
                    <div className = "reservation">
                      <div className = "reservation-info">
                        <p>Reservation ID: {reservation.reservationID}</p>
                        {reservation.movieID === 1 && <p>Movie: Oppenheimer</p>}
                        {reservation.movieID === 2 && <p>Movie: Barbie</p>}
                        {reservation.movieID === 3 && <p>Movie: Gran Turismo</p>}
                        {reservation.movieID === 4 && <p>Movie: Top Gun Maverick</p>}
                        {reservation.movieID === 5 && <p>Movie: The Notebook</p>}
                        {reservation.movieID === 6 && <p>Movie: Serendipity</p>}
                        {reservation.movieID === 7 && <p>Movie: Black Panther</p>}
                        {reservation.movieID === 8 && <p>Movie: The Avengers</p>}
                        <p>Time: {reservation.time}</p>
                        <p>Seats: {reservation.seats}</p>
                      </div>
                    </div>
                  </li>
                  <hr></hr>
                  </>
                ))}
        </div>
      
    );
}
  
export default ReservationsMade;