import '../App.css';
import React, { useEffect, useState } from 'react';
import { getReviews } from '../data/GraphQLRepo';
import { useNavigate } from 'react-router-dom';

function DashboardReviews(props) {
    const [reviews, setReviews] = useState([]);
    const navigate = useNavigate();

    // Get all reviews from database
    useEffect(() => {
        async function fetchData() {
            const reviews = await getReviews();
            setReviews(reviews.all_reviews);
        }
        fetchData();
    }, []);

    console.log(reviews);
    
    // Handle manage button click, redirect to manage page
    const handleManage = (e, feature, reviews) => {
        e.preventDefault();

        const data = {
            reviews: reviews,
            feature: feature
        }

        navigate('/manage', {state: data});
    }

    return (
        <div className = "admin-dashboard-column">
            <div className="admin-dashboard-reviews">
                <div className = "dashboard-column-content">
                    <h2 id = "dashboard-column-heading">Reviews</h2>
                    {reviews.map((review) => (
                        <ul>
                            <li key={review.reviewID}>
                                <div className = "dashboard-review-heading">
                                    <p>Review ID: {review.reviewID}</p>
                                    <p>Movie ID: {review.movieID}</p>
                                </div>
                                <p>Rating: {review.stars}</p>
                                <p>Review: {review.review}</p>  
                            </li>
                        </ul>
                    ))}
                </div>
            </div> 
            <div className = "dashboard-manage-button">
                <input onClick = {(e) => handleManage(e, 2, reviews)} type = "admin-manage" className = "btn btn-primary" value = "manage" readOnly/> 
            </div>
        </div>
    );
}
export default DashboardReviews;