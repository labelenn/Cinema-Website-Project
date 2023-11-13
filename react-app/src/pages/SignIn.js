import '../App.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {verifyUser} from "../data/Data";
import { Link } from 'react-router-dom';
import UsersDataService from '../services/UsersService.js';

import bcrypt from 'bcryptjs';


function SignIn(props) {
    const [fields, setFields] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();
    const [successfulSigninMessage, setSuccessfulSigninMessage] = useState("");

    // Generic change handler.
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        const temp = { email: fields.email, password: fields.password };

        // Update field and state.
        temp[name] = value;
        setFields(temp);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Check if email and password are blank.
        if (fields.email === "" || fields.password === "") {
            setErrorMessage("Email and / or password invalid, please try again.");
            return;
        }
        
        UsersDataService.get(fields.email)
            .then(response => {
            
                // verify password
                if (response.data === null) {
                    // Reset password field to blank.
                    const temp = { ...fields };
                    temp.password = "";
                    setFields(temp);

                    // Set error message.
                    setErrorMessage("Email and / or password invalid, please try again.");
                    return;
                }

                if (bcrypt.compareSync(fields.password, response.data.password) === false) {
                    // Reset password field to blank.
                    const temp = { ...fields };
                    temp.password = "";
                    setFields(temp);

                    // Set error message.
                    setErrorMessage("Email and / or password invalid, please try again.");
                    return;
                }

                const data = {
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    email: response.data.email,
                    password: response.data.password,
                    loggedIn: true,
                    adminBlocked: response.data.adminBlocked,
                    createdAt: response.data.createdAt,
                    updatedAt: response.data.updatedAt
                }

                props.loginUser(fields.email);
                setTimeout(navigate, 2000, "/");
                setErrorMessage(null);
                setSuccessfulSigninMessage("Sign in successful, redirecting to home page.");
            })
            .catch(e => {
                setErrorMessage("Email and / or password invalid, please try again.");
                console.log(e);
            });
    }

    return (
        <div className = "signin">
            <h1>Sign in</h1>
            <form className = "account-form" onSubmit = {handleSubmit}>
                <div className = "form-group">
                    <label htmlFor = "email" className = "control-label">Email</label>
                    <input type = "email" id = "email" className = "form-control" name = "email" placeholder = "Enter email"
                    value = {fields.email} onChange={handleInputChange}/>
                </div>
                <div className = "form-group">
                    <label htmlFor = "password" className = "control-label">Password</label>
                    <input type = "password" name = "password" id = "password" className = "form-control" placeholder = "Enter password" 
                    value = {fields.password} onChange={handleInputChange}/>
                </div>
                <div className = "form-group">
                    <input type = "submit" className = "btn btn-primary" value = "Sign In"/>
                </div>
                {errorMessage !== null &&
                    <div className="form-group">
                        <div className = "signin-error">
                            <span className="text-danger">{errorMessage}</span>
                        </div>
                    </div>
                }
                <p>New to Loop Web? <Link to="/signup">Register</Link></p> 
                {successfulSigninMessage !== "" &&
                    <div className="signin-success">
                        <h3 style = {{"color": "green"}}>{successfulSigninMessage}</h3>
                    </div>
                }
            </form>
              
        </div>
      
    );
}
  
export default SignIn;