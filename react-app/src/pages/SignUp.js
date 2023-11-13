import '../App.css';
import React, { useState } from 'react';
import {verifyUser, addUser} from "../data/Data";
import { useNavigate } from 'react-router-dom';
import UsersDataService from '../services/UsersService';

import bcrypt from 'bcryptjs';

function SignUp(props) {
    const [fields, setFields] = useState({ firstname: "", lastname: "", email: "", password: "", loggedIn: false });
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorFields, setErrorFields] = useState({ blank: "", insufficient: "" });
    const [successfulSignUp, setSuccessfulSignUpMessage] = useState("");
    const navigate = useNavigate();

    // for hashing password
    const salt = bcrypt.genSaltSync(10);

    // Generic change handler.
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        // Copy fields.
        const temp = {firstname: fields.firstname, lastname: fields.lastname, email: fields.email, password: fields.password, loggedIn: fields.loggedIn, adminBlocked: false };

        // Update field and state.
        temp[name] = value;
        setFields(temp);
    }

    const resetPasswordField = () => {
      // Reset password field to blank.
      const temp = { ...fields };
      temp.password = "";
      setFields(temp);
    }

    const resetEmailExists = () => {
      // Reset email field to blank.
      const temp = { ...fields };
      temp.password = "";
      temp.email = "";
      setFields(temp);
    }

    const handleSubmit = (event) => {
        setErrorMessage(null);
        event.preventDefault();
        let weakPassword = false;
        let blankMsg = "";
        let errorMsg = "";


        if (fields.firstname === "" || fields.lastname === "" || fields.email === "" || fields.password === "") {
          blankMsg += "Please fill out all fields.";
          weakPassword = true;         
        }

        if (fields.password.length < 8) {
          errorMsg += "Password must be at least 8 characters long.\r\n";
          weakPassword = true;      
        }

        if (fields.password.search(/[a-z]/) < 0) {
          errorMsg += "Password must contain at least one lowercase letter.\r\n";
          weakPassword = true;      
        }

        if (fields.password.search(/[A-Z]/) < 0) {
          errorMsg += "Password must contain at least one uppercase letter.\r\n";
          weakPassword = true;      
        }

        if (fields.password.search(/[0-9]/) < 0) {
          errorMsg += "Password must contain at least one digit.\r\n";
          weakPassword = true;      
        }

        if (fields.password.search(/[!@#$%^&*]/) < 0) {
          errorMsg += "Password must contain at least one special character (!@#$%^&*).\r\n";
          weakPassword = true;      
        }

        if (weakPassword) {
          setErrorFields({blank: blankMsg, insufficient: errorMsg});
          resetPasswordField();
          return;
        }

        // Check if email already exists in database.
        UsersDataService.getAll()
          .then(response => {
            const users = response.data;
            for (let i = 0; i < users.length; i++) {
              if (users[i].email === fields.email) {
                setErrorMessage("Email already exists.");
                resetEmailExists();
                return;
              }
            }
          })
          .catch(e => {
            console.log(e);
          });
        
        // Hash password before adding user to database
        const user = {...fields};
        user.password = bcrypt.hashSync(user.password, salt);
        console.log(user);
        UsersDataService.create(user)
          .then(response => {
            props.loginUser(fields.email);
            setTimeout(navigate, 2000, "/");
            setSuccessfulSignUpMessage("You have successfully signed up! Redirecting to home page...");
            return;
          })
          .catch(e => {
            console.log(e);
          });

        return;
    }
    return (
      <div className = "signup">
        <h1>Sign up</h1>
        <form className = "account-form" onSubmit = {handleSubmit}>
          <div className = "form-group">
            <label htmlFor = "firstname" className = "control-label">First Name</label>
              <input type = "firstname" id = "firstname" className = "form-control" name = "firstname" placeholder = "Enter first name"
               value = {fields.firstname} onChange={handleInputChange}/>
          </div>
          <div className = "form-group">
            <label htmlFor = "lastname" className = "control-label">Last Name</label>
              <input type = "lastname" id = "lastname" className = "form-control" name = "lastname" placeholder = "Enter last name"
               value = {fields.lastname} onChange={handleInputChange}/>
          </div>
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
            <input type = "submit" className = "btn btn-primary" value = "Sign Up"/>
          </div>
          {(errorMessage !== null &&
            <div className="form-group">
              <div className = "signin-error">
                <span className="text-danger">{errorMessage}</span>
              </div>
            </div>)
          }
          {errorFields !== null &&
            <div className="form-group">
              <div className = "signin-error">
                <span className="text-danger">{errorFields.blank}</span><br></br>
                <span className="text-danger">{errorFields.insufficient}</span>
              </div>
            </div>
          }
          {successfulSignUp !== "" &&
            <div className="form-group">
              <h2 style = {{"color": "green"}}>{successfulSignUp}</h2>
            </div>
          }
        </form>
      </div>
    );
}
  
export default SignUp;