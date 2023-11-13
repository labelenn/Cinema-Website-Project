import '../../App.css';
import React, { useState, useEffect } from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import ReviewsDataService from "../../services/ReviewsService";

function EditReview(props) {
  const [reviewID, setReviewID] = useState("Unknown");
  const [stars, setStars] = useState("Unknown");
  const [review, setReview] = useState("Unknown");
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    if (data !== null) {
      setReviewID(data.reviewID);
      setStars(data.stars);
      setReview(data.review);
    }
  }, []);

  const handleDelete = () => {
    ReviewsDataService.remove(data.reviewID)
      .then(response => {
        console.log(response.data);
        navigate("/reviews");
      })
      .catch(e => {
        console.log(e);
      });
  }
  const handleCancel = () => {
    navigate("/reviews");
  }

    return (
      <div className = "content-reviews">
        <h3>Are you sure you want to delete this review?</h3>
        <h4>This will be permanently deleted.</h4>

        <div className = "reviews">
            <hr></hr>
            <h3>Review ID: {reviewID}</h3> 
            <h3>Stars: {stars}</h3>
            {(stars === "1" || stars === 1 ) && <h4>&#11088;</h4>}
            {(stars === "2" || stars === 2) && <h4>&#11088;&#11088;</h4>}
            {(stars === "3" || stars === 3) && <h4>&#11088;&#11088;&#11088;</h4>}
            {(stars === "4" || stars === 4) && <h4>&#11088;&#11088;&#11088;&#11088;</h4>}
            {(stars === "5" || stars === 5) && <h4>&#11088;&#11088;&#11088;&#11088;&#11088;</h4>}
            <h3>Review: {review}</h3>  
            <hr></hr>
        </div>
        <div className = "form-group">
          <input onClick={handleDelete} type="review-button" value="Yes" className="btn btn-primary" readOnly/>
          <input onClick = {handleCancel} type = "review-button" className = "btn btn-primary" value = "No" readOnly/>
        </div>
      </div>
      
    );
}
  
export default EditReview;