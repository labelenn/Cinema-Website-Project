import '../../App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersDataService from '../../services/UsersService';
import ReviewsDataService from "../../services/ReviewsService";
import avengers from '../../images/avengers.jpg';
import blackpanther from '../../images/black panther.jpg';
import oppenheimer from '../../images/oppenheimer.jpg';
import barbie from '../../images/barbie.jpg';
import serendipity from '../../images/serendipity.jpg';
import thenotebook from '../../images/the notebook.jpg';
import topgun from '../../images/top gun maverick.jpg';
import granturismo from '../../images/gran turismo.jpg';

function Reviews(props) {
  const [email, setEmail] = useState(null);
  const [userBlocked, setUserBlocked] = useState(null);
  const [movieName, setMovieName] = useState("");
  const [movieID, setMovieID] = useState(0);
  const [moviePoster, setMoviePoster] = useState(null);
  const [fields, setFields] = useState({ stars: "", review: ""});
  const [errorStars, setErrorStars] = useState("");
  const [errorReview, setErrorReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load logged in user first render
  useEffect (() => {
    async function loadUser() {
      const response = await UsersDataService.loggedInUser();
      if (response.data.length !== 0) {
        setEmail(response.data[0].email);
        setUserBlocked(response.data[0].adminBlocked);
      }
    }
    loadUser();
  }, []);

  // Load reviews first render
  useEffect (() => {
    async function loadReviews() {
      const reviews = await ReviewsDataService.getAll()
      .then(response => {
        return response.data;
      })
      .catch(e => {
        console.log(e);
      });

      setReviews(reviews);
      setIsLoading(false);
    }
    loadReviews();
  }, []);

  const setSelectedMovie = (movieID) => {
    setMovieID(movieID);

    switch (movieID) {
      case 1:
        setMovieName("Oppenheimer");
        setMoviePoster(oppenheimer);
        break;
      case 2:
        setMovieName("Barbie");
        setMoviePoster(barbie);
        break;
      case 3:
        setMovieName("Gran Turismo");
        setMoviePoster(granturismo);
        break;
      case 4:
        setMovieName("Top Gun Maverick");
        setMoviePoster(topgun);
        break;
      case 5:
        setMovieName("The Notebook");
        setMoviePoster(thenotebook);
        break;
      case 6:
        setMovieName("Serendipity");
        setMoviePoster(serendipity);
        break;
      case 7:
        setMovieName("Black Panther");
        setMoviePoster(blackpanther);
        break;
      case 8:
        setMovieName("The Avengers");
        setMoviePoster(avengers);
        break;
      default:
        setMovieName("");
        setMoviePoster(null);
        break;
    }
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


  const resetStarsField = () => {
    const temp = { ...fields };
    temp.stars = "";
    setFields(temp);
  }

  const handleSubmit = (event) => {

    // If user is blocked by admin
    if (userBlocked) {
      alert("You cannot add reviews. You are currently blocked by admin.");
      return;
    }

    let stars = fields.stars;
    let review = fields.review;

    setErrorStars("");
    setErrorReview("");
    event.preventDefault();
    let errorInput = false;
    let starsMsgError = "";
    let reviewMsgError = "";

    if (stars === "") {
      starsMsgError = "Please enter star rating.";
      errorInput = true;
    }

    if (review === "") {
      reviewMsgError = "Please enter a review.";
      errorInput = true;
    }
    console.log(parseInt(stars));
    if (isNaN(stars) || parseInt(stars) < 1 || parseInt(stars) > 5) {
      starsMsgError = "Please enter a star rating between 1 and 5 only.";
      errorInput = true;
    }

    if (review.length > 600) {
      reviewMsgError = "Review cannot exceed 600 characters.";
      errorInput = true;
    }

    if (errorInput) {
      setErrorStars(starsMsgError);
      setErrorReview(reviewMsgError);
      resetStarsField();
      return;
    }

    let movieID = 0;
    switch (movieName) {
      case "Oppenheimer":
        movieID = 1;
        break;
      case "Barbie":
        movieID = 2;
        break;
      case "Gran Turismo":
        movieID = 3;
        break;
      case "Top Gun Maverick":
        movieID = 4;
        break;
      case "The Notebook":
        movieID = 5;
        break;
      case "Serendipity":
        movieID = 6;
        break;
      case "Black Panther":
        movieID = 7;
        break;
      case "The Avengers":
        movieID = 8;
        break;
      default:
        movieID = 0;
        break;
    }

    const data = {
      stars: stars,
      review: review,
      movieID: movieID,
      email: props.email,
      adminDeleted: false
    };

    console.log(data);

    ReviewsDataService.create(data)
      .then(response => {
        setReviews([...reviews, response.data ]);
        setFields({ stars: "", review: ""});
      })
      .catch(e => {
        console.log(e);
      });
  }

  const handleEditReview = (id, review, stars, deleted) => {
    if (userBlocked) {
      alert("You cannot edit reviews. You are currently blocked by admin.");
      return;
    }

    const data = {
      stars: stars,
      review: review,
      movieID: movieID,
      email: props.email,
      movieName: movieName,
      reviewID: id,
      adminDeleted: deleted
    };

    navigate("/editreview", {state: data});
  }

  const handleDeleteReview = (id, review, stars, deleted) => {
    const data = {
      stars: stars,
      review: review,
      movieID: movieID,
      email: props.email,
      movieName: movieName,
      reviewID: id,
      adminDeleted: deleted
    };

    navigate("/deletereview", {state: data});
  }

    return (
      <div className = "content-reviews">
        <h1 id = "review-prompts">Select a movie to add or see the reviews</h1>
        <div className = "movie-list">
          <ul>
            <button onClick = {() => setSelectedMovie(1)}>Oppenheimer</button>
            <button onClick = {() => setSelectedMovie(2)}>Barbie</button>
            <button onClick = {() => setSelectedMovie(3)}>Gran Turismo</button>
            <button onClick = {() => setSelectedMovie(4)}>Top Gun Maverick</button>
            <button onClick = {() => setSelectedMovie(5)}>The Notebook</button>
            <button onClick = {() => setSelectedMovie(6)}>Serendipity</button>
            <button onClick = {() => setSelectedMovie(7)}>Black Panther</button>
            <button onClick = {() => setSelectedMovie(8)}>The Avengers</button>
          </ul>
        </div>

        {movieID !== 0 && 
        <>
          <img id = "review-movie-poster" src = {moviePoster} alt = {movieName} border = "0"></img>
          <h2 id = "review-prompts">Movie Reviews for {movieName}</h2>
          {email === null ?
            <h4 id = "review-prompts">Sign in to your account to add a review or edit your previous one.</h4>
            :
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
                <div className = "form-group">
                  <input onClick = {handleSubmit} type = "submit" className = "btn btn-primary" value = "Submit" readOnly/>
                </div>
              </form>
          }
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
        </>
        }
        {isLoading ?
          <h2>Loading reviews...</h2>
          :
          reviews.length === 0  ?
            movieName === "" ?
              null
              :
              <h4 id = "review-prompts">No reviews yet for {movieName} :(</h4>
            :
            <div className = "reviews">
              <ul>
                {/* For reviews by the currently logged in user */}
                {reviews.map((review, index) => 
                ( review.movieID === movieID && review.email === props.email && props.email !== null &&
                  <>
                  <hr></hr>
                  <li key = {review.reviewID}>
                    {review.adminDeleted && <h1>***Admin deleted this review.***</h1>}
                    {!review.adminDeleted &&
                    <>
                    <h3>Review ID: {review.reviewID}</h3> 
                    <h3>Stars: {review.stars}</h3>
                    {(review.stars === "1" || review.stars === 1 ) && <h4>&#11088;</h4>}
                    {(review.stars === "2" || review.stars === 2) && <h4>&#11088;&#11088;</h4>}
                    {(review.stars === "3" || review.stars === 3) && <h4>&#11088;&#11088;&#11088;</h4>}
                    {(review.stars === "4" || review.stars === 4) && <h4>&#11088;&#11088;&#11088;&#11088;</h4>}
                    {(review.stars === "5" || review.stars === 5) && <h4>&#11088;&#11088;&#11088;&#11088;&#11088;</h4>}
                    <h3>Review: {review.review}</h3>
                    <div className = "manage-review-buttons">
                      <div className = "form-group" id = "review-button">
                        <input onClick = {() => handleEditReview(review.reviewID, review.review, review.stars, review.adminDeleted)} type = "review-button" className = "btn btn-primary" value = "Edit" readOnly/>
                      </div>
                      <div className = "form-group" id = "review-button">
                        <input onClick = {() => handleDeleteReview(review.reviewID, review.review, review.stars, review.adminDeleted)} type = "review-button" className = "btn btn-primary" value = "Delete" readOnly/>
                      </div>
                    </div>
                    </>
                    }
                  </li>
                  <hr></hr>
                  </>
                )           
                )}

                {/* For reviews by other users */}
                {reviews.map((review, index) => 
                ( review.movieID === movieID && (review.email !== props.email || review.email === null) &&
                  <>
                  <hr></hr>
                  <li key = {review.reviewID}>
                    {review.adminDeleted && <h1>***Admin deleted this review.***</h1>}
                    {!review.adminDeleted &&
                    <>
                    <h3>Stars: {review.stars}</h3>
                    {(review.stars === "1" || review.stars === 1 ) && <h4>&#11088;</h4>}
                    {(review.stars === "2" || review.stars === 2) && <h4>&#11088;&#11088;</h4>}
                    {(review.stars === "3" || review.stars === 3) && <h4>&#11088;&#11088;&#11088;</h4>}
                    {(review.stars === "4" || review.stars === 4) && <h4>&#11088;&#11088;&#11088;&#11088;</h4>}
                    {(review.stars === "5" || review.stars === 5) && <h4>&#11088;&#11088;&#11088;&#11088;&#11088;</h4>}
                    <h3>Review: {review.review}</h3>
                    </>
                    }
                  </li>
                  <hr></hr>
                  </>
                )
                )
                }    
              </ul>
            </div>
        }       
      </div>
      
    );
}
  
export default Reviews;