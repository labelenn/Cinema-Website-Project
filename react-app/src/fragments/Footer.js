import '../App.css';
import React, { useContext } from 'react';
import facebook from '../images/facebook.png';
import instagram from '../images/instagram.png';
import twitter from '../images/twitter.png';
import whitelogo from '../images/logo-white.png';
import { NavLink } from 'react-router-dom';
import { Context } from '../App';

function Footer(props) {
    const [adminPage, setAdminPage] = useContext(Context);

    return (
      <div className = "footer">
        {adminPage ?
          <>
          <div></div>
          <img style = {{"width": "15%"}} src = {whitelogo} alt = "white logo"></img>
          <div></div>
          </>
          :
          <>
          <div className = "contact">
            <h4>Contact us</h4>
            <h5 style = {{"padding-bottom": "20px"}}>+61999999999</h5>
            <NavLink id = "for-admins-link" to = '/admin' onClick = {() => setAdminPage(true)}>For Admins</NavLink>
          </div>

          <div className = "socials">
            <h4>Socials</h4>
            <img src = {facebook} alt = "facebook"></img>
            <img src = {instagram} alt = "instagram"></img>
            <img src = {twitter} alt = "twitter"></img>
          </div>

          <div className = "locations">
            <h4>Find us</h4>
            <h5>Melbourne 3000, VIC</h5>
            <h5>Sydney 2000, NSW</h5>
            <h5>Brisbane 4000, QLD</h5>
          </div>
          </>
        }
      </div>
    );
}
  
export default Footer;