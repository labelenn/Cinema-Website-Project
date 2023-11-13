import '../App.css';
import React, { useState, useEffect } from 'react';
import {verifyUser, editUser, deleteUser} from "../data/Data";
import { useNavigate } from 'react-router-dom';
import UsersDataService from "../services/UsersService";
import ReviewsDataService from "../services/ReviewsService";

import bcrypt from 'bcryptjs';

function Profile(props) {
    const [updateProf, setUpdateProf] = useState(false);
    const [deleteProf, setDeleteProf] = useState(false);
    const [user, setUser] = useState(null);
    const [fields, setFields] = useState({ 
      firstname: props.firstname, lastname: props.lastname, email: props.email, password: "", joindate: props.joindate, loggedIn: null,
      adminBlocked: props.adminBlocked
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorFields, setErrorFields] = useState({ blank: "", insufficient: "" });
    const [successfulSignUp, setSuccessfulSignUpMessage] = useState("");
    const [deleteSuccessMessage, setDeleteSuccess] = useState("");
    const [deleteFailedMessage, setDeleteFailed] = useState("");
    const navigate = useNavigate();

    useEffect (() => {
      async function fetchData() {
        const response = await UsersDataService.loggedInUser();
        if (response.data.length !== 0) {
          console.log("logged in user:");
          console.log(response.data[0])
          setUser(response.data[0]);
        }

        if (fields.firstname === null) {
          const temp = { ...fields };
          temp.firstname = response.data[0].firstname;
          temp.lastname = response.data[0].lastname;
          temp.email = response.data[0].email;
          temp.password = "";
          temp.joindate = "";
          temp.loggedIn = response.data[0].loggedIn;
          temp.adminBlocked = response.data[0].adminBlocked;
          setFields(temp);
        }
      }

      fetchData();
    }, [setUser]);

    const salt = bcrypt.genSaltSync(10);

    // Generic change handler.
    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        // Copy fields.
        const temp = {firstname: fields.firstname, lastname: fields.lastname, email: fields.email, password: fields.password, loggedIn: fields.loggedIn, adminBlocked: fields.adminBlocked };

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
        let weakInput = false;
        let blankMsg = "";
        let errorMsg = "";


        if (fields.firstname === "" || fields.lastname === "" || fields.email === "" || fields.password === "") {
          blankMsg += "Please fill out all fields.";
          weakInput = true;         
        }

        if (fields.password.length < 8) {
          errorMsg += "Password must be at least 8 characters long.\r\n";
          weakInput = true;      
        }

        if (fields.password.search(/[a-z]/) < 0) {
          errorMsg += "Password must contain at least one lowercase letter.\r\n";
          weakInput = true;      
        }

        if (fields.password.search(/[A-Z]/) < 0) {
          errorMsg += "Password must contain at least one uppercase letter.\r\n";
          weakInput = true;      
        }

        if (fields.password.search(/[0-9]/) < 0) {
          errorMsg += "Password must contain at least one digit.\r\n";
          weakInput = true;      
        }

        if (fields.password.search(/[!@#$%^&*]/) < 0) {
          errorMsg += "Password must contain at least one special character (!@#$%^&*).\r\n";
          weakInput = true;      
        }

        if (weakInput) {
          setErrorFields({blank: blankMsg, insufficient: errorMsg});
          resetPasswordField();
          return;
        }    

        
        // Check if email was changed
        if (fields.email !== props.email) {
          // If email was changed, delete old user and create new user.
          const oldEmail = props.email;
          const newEmail = fields.email;

          // Check if new email already exists in database.
          UsersDataService.getAll()
            .then(response => {
              const users = response.data;
              for (let i = 0; i < users.length; i++) {
                if (users[i].email === newEmail) {
                  setErrorMessage("Email already exists.");
                  resetEmailExists();
                  return;
                }
              }
            })
            .catch(e => {
              console.log(e);
            });

          UsersDataService.remove(oldEmail)
            .then(response => {
            console.log("User deleted successfully.");
            })
            .catch(e => {
              console.log(e);
            });
          
          const data = {
            firstname: fields.firstname,
            lastname: fields.lastname,
            email: fields.email,
            password: bcrypt.hashSync(fields.password, salt),
            loggedIn: false,
            adminBlocked: fields.adminBlocked,
            createdAt: props.joindate,
            updatedAt: props.updatedAt
          }

          console.log ("create:")
          console.log(data);
          UsersDataService.create(data)
            .then(response => {
              console.log("User created successfully.");
              console.log("User updated successfully.");
              props.loginUser(newEmail);
              setTimeout(navigate, 1000, "/");
              setSuccessfulSignUpMessage("You have successfully edited your profile! Redirecting to home page...");
            })
            .catch(e => {
              console.log(e);
            });
          return;
        }

        // If not, just update user
        const data = {
          firstname: fields.firstname,
          lastname: fields.lastname,
          email: fields.email,
          password: bcrypt.hashSync(fields.password, salt),
          loggedIn: false,
          adminBlocked: fields.adminBlocked,
          createdAt: props.joindate,
          updatedAt: props.updatedAt
        }

        console.log ("update:")
        console.log(data);
        UsersDataService.update(fields.email, data)
          .then(response => {
            console.log("User updated successfully.");
            setTimeout(navigate, 1000, "/");
            props.loginUser(fields.email);
            setSuccessfulSignUpMessage("You have successfully edited your profile! Redirecting to home page...");
          })
          .catch(e => {
            console.log(e);
          });
  
        return;
    }

    const cancelUpdate = () => {
        setUpdateProf(false);
        return;
    }

    // Set booleans to track which button was clicked.
    const editProfile = () => {setUpdateProf(true);}
    const deleteProfile = () => {setDeleteProf(true);}

    // Functions for delete option
    const userDelete = () => {
      // Delete all reviews by user
      ReviewsDataService.getAllByEmail(props.email)
      .then(response => {
        const reviews = response.data;
        for (let i = 0; i < reviews.length; i++) {
          console.log(reviews[i].reviewID);
          ReviewsDataService.remove(reviews[i].reviewID)
            .then(response => {
              console.log("Review deleted successfully.");
            })
            .catch(e => {
              console.log(e);
            });
        }
      })
      .catch(e => {
        console.log(e);
      });

      UsersDataService.remove(props.email)
        .then(response => {
          console.log("User deleted successfully.");
          props.logoutUser();

          setTimeout(navigate, 2000, "/");
          setDeleteSuccess("Profile deleted. Redirecting to home page...")
        })
        .catch(e => {
          console.log(e);
          setDeleteFailed("Profile not deleted. Please try again.")
        });
      return;
    };

    const cancelDelete = () => {setDeleteProf(false);}  


    return (
      
      <div className = "profile">
        <div className = "profile-details">
          <h1 id = "profile-heading">Profile</h1>

          {updateProf === false && deleteProf === false && user !== null &&
          <div>
            <h2 id = "profile-content">Name: {user.firstname} {user.lastname}</h2>
            <h2 id = "profile-content">Email: {user.email}</h2>
            <h3 id = "profile-content">Joined: {user.createdAt.substring(8,10)}/{user.createdAt.substring(5,7)}/{user.createdAt.substring(0,4)}</h3>
            <input onClick = {editProfile} type = "submit" className = "btn btn-primary" value = "Edit Profile" readOnly/>
            <input onClick = {deleteProfile} type = "submit" className = "btn btn-primary" value = "Delete Profile" readOnly/>
          </div>
          }

          {updateProf === false && deleteProf === false && user === null &&
          <div>
          <h2 id = "profile-content">Name: {props.firstname} {props.lastname}</h2>
          <h2 id = "profile-content">Email: {props.email}</h2>
          <h2 id = "profile-content">Joined: {props.joindate}</h2>
          <input onClick = {editProfile} type = "submit" className = "btn btn-primary" value = "Edit Profile" readOnly/>
          <input onClick = {deleteProfile} type = "submit" className = "btn btn-primary" value = "Delete Profile" readOnly/>
        </div>
        }
        </div>

        {updateProf === true &&
        <div>
          <div className = "signup" style = {{"background-color": "#202020", "border-radius": "8px", "padding": "50px"}}>
            <h1 style = {{"text-align": "center"}}>Edit Profile</h1>
            <form>
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
                <input onClick = {handleSubmit} type = "update" className = "btn btn-primary" value = "Update" readOnly/>
                <input onClick = {cancelUpdate} type = "cancel" className = "btn btn-primary" value = "Cancel" readOnly/>
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
        </div>
        }

        {deleteProf === true &&
        <>
        <div style = {{"background-color": "#202020", "border-radius": "8px", "padding": "50px"}}>
          <h1 id = "profile-content">Are you sure you want to delete your profile?</h1>
          <h2 id = "profile-content">All your information and reviews will be deleted permanently.</h2>
          <input onClick = {userDelete} type = "submit" className = "btn btn-primary" value = "Yes" readOnly/>
          <input onClick = {cancelDelete} type = "submit" className = "btn btn-primary" value = "No" readOnly/>
          {deleteSuccessMessage !== "" &&
            <div className="form-group">
              <h2 style = {{"color": "green"}}>{deleteSuccessMessage}</h2>
            </div>
          }
          {deleteFailedMessage !== "" &&
            <div className="form-group">
              <span className="text-danger">{deleteFailedMessage}</span>
            </div>
          }
        </div>
        </>
        }
      </div>
      
    );
}
  
export default Profile;