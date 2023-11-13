import '../../App.css';
import React, { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import ReviewsDataService from "../../services/ReviewsService";

function EditReview(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [stars, setStars] = useState("Unknown");
  const [review, setReview] = useState("Unknown");
  const [email, setEmail] = useState("Unknown");
  const [movieID, setMovieID] = useState("Unknown");
  const [reviewID, setReviewID] = useState("Unknown");
  const [movieName, setMovieName] = useState("Unknown");

  useEffect(() => {
    if (data !== null) {
      setStars(data.stars);
      setReview(data.review);
      setEmail(data.email);
      setMovieID(data.movieID);
      setReviewID(data.reviewID);
      setMovieName(data.movieName);
      setFields({ stars: data.stars, review: data.review});
    }
  }, []);

  const [fields, setFields] = useState({ stars: stars, review: review});
  const [errorStars, setErrorStars] = useState("");
  const [errorReview, setErrorReview] = useState("");

  const handleSubmit = (event) => {
    let current_stars = fields.stars;
    let current_review = fields.review;

    setErrorStars("");
    setErrorReview("");
    event.preventDefault();
    let errorInput = false;
    let starsMsgError = "";
    let reviewMsgError = "";

    if (current_stars === "") {
      starsMsgError = "Please enter star rating.";
      errorInput = true;
    }

    if (current_review === "") {
      reviewMsgError = "Please enter a review.";
      errorInput = true;
    }
    
    if (isNaN(current_stars) || parseInt(current_stars) < 1 || parseInt(current_stars) > 5) {
      starsMsgError = "Please enter a star rating between 1 and 5 only.";
      errorInput = true;
    }

    if (current_review.length > 600) {
      reviewMsgError = "Review cannot exceed 600 characters.";
      errorInput = true;
    }

    if (errorInput) {
      setErrorStars(starsMsgError);
      setErrorReview(reviewMsgError);
      resetStarsField();
      return;
    }

    const updatedData = {
      stars: current_stars,
      review: current_review,
      movieID: movieID,
      email: email,
      reviewID: reviewID,
      adminDeleted: data.adminDeleted
    };

    ReviewsDataService.update(data.reviewID, updatedData)
      .then(response => {
        console.log(response.data);
        setFields({ stars: "", review: ""});
        navigate("/reviews");
      })
      .catch(e => {
        console.log(e);
      });
  }

  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    // Copy fields.
    const temp = {stars: fields.stars, review: fields.review };

    // Update field and state.
    temp[name] = value;
    setFields(temp);
  }

  const handleCancel = () => {
    navigate("/reviews");
  }

  const resetStarsField = () => {
    const temp = { ...fields };
    temp.stars = "";
    setFields(temp);
  }


    return (
      <div className = "content-reviews">
        <h2>Edit Review ID: {reviewID} for {movieName}</h2>
        <form onSubmit = {handleSubmit}>
          <div className = "form-group">
            <label htmlFor = "stars" className = "control-label">Stars</label>
            <input type = "stars" id = "stars" className = "form-control" name = "stars" placeholder = "Stars (1-5)"
            value = {fields.stars} onChange = {handleInputChange}/>
          </div>
          <div className = "form-group">
            <label htmlFor = "review" className = "control-label">Review</label>
            <input type = "review" id = "review" className = "form-control" name = "review" placeholder = "Enter review"
            value = {fields.review} onChange = {handleInputChange}/>
          </div>
        </form>
        <div className = "form-group">
            <input onClick = {handleSubmit} type = "review-submit" className = "btn btn-primary" value = "Submit" readOnly/>
            <input onClick = {handleCancel} type = "review-button" className = "btn btn-primary" value = "Cancel" readOnly/>
        </div>
      
      {errorStars !== "" &&
        <div className="form-group">
          <span className = "text-danger">{errorStars}</span>
        </div>
      }
      {errorReview !== "" &&
        <div className="form-group">
          <span className = "text-danger">{errorReview}</span>
        </div>
      }

      </div>
      
    );
}
  
export default EditReview;