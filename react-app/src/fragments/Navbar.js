import '../App.css';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Context } from '../App';
import whitelogo from '../images/logo-white.png';

function Navbar(props) {
    const [adminPage, setAdminPage] = useContext(Context);
    
    return (
        <nav className = "nav">
            {adminPage ?
            <>
                <NavLink to = "/admin">Admin Dashboard</NavLink>
            </>
            :
            <ul>
                <li><NavLink className = 'nav-link' to="/reviews">Reviews</NavLink></li>     
                {props.firstname !== null &&
                    <>            
                        <li><NavLink to="/profile">Profile</NavLink></li>
                        <li><NavLink to="/my-reservations">My Reservations</NavLink></li>
                    </>
                }
            
                {props.firstname === null ?
                
                    <li><NavLink className = 'nav-link' to="/signin">Sign in</NavLink></li>
                    :
                    <>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/signin" onClick={props.logoutUser}>Sign out</NavLink>
                        </li> 
                    </>
                
                }
            </ul>
            }
        </nav>
      
    );
}
  
export default Navbar;