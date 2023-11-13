import '../App.css';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../images/logo.png';
import { Context } from '../App';

function Header() {
    const [adminPage, setAdminPage] = useContext(Context);

    return (
        <div className = "logo">
            <Link to = '/' onClick = {() => {setAdminPage(false)}}>Loop Web</Link>
        </div>
    );
}
  
export default Header;