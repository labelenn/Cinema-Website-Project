import { request, gql } from 'graphql-request';

const GRAPH_QL_URL = "http://localhost:8080/graphql";

async function getUsers() {
    const query = gql`
    {
        all_users {
            firstname
            lastname
            email
            password
            adminBlocked
            loggedIn
            reviews {
                reviewID
                review
                stars
                movieID
            }
            createdAt
            updatedAt
        }
      }
    `;

    const data = await request(GRAPH_QL_URL, query);
    return data;
}

async function getMovies() {
    const query = gql`
    {
        all_movies {
            movieID
            name
            director
            plot
            yearReleased
            createdAt
            updatedAt
        }
      }
    `;

    const data = await request(GRAPH_QL_URL, query);
    return data;
}

async function getReviews() {
    const query = gql`
    {
        all_reviews {
            reviewID
            review
            stars
            movieID
            adminDeleted
        }
      }
    `;

    const data = await request(GRAPH_QL_URL, query);
    return data;
}

async function getUser(email) {
    const query = gql`
    {
        query($email: String){
            user(email: $email) {
                firstname
                lastname
                email
                password
                adminBlocked
                loggedIn
                reviews {
                    reviewID
                    review
                    stars
                    movieID
                }
                createdAt
                updatedAt
            }
        }
    }
    `;
    const variables = {email};
    const data = await request(GRAPH_QL_URL, query, variables);
    return data;
}

async function getMovie(movieID) {
    const query = gql`
    {
        query($movieID: Int){
            movie(movieID: $movieID) {
                movieID
                name
                director
                plot
                yearReleased
                createdAt
                updatedAt
            }
        }
    }
    `;
    const variables = {movieID};
    const data = await request(GRAPH_QL_URL, query, variables);
    return data;
}

async function getReview(reviewID) {
    const query = gql`
    {
        query($reviewID: Int){
            review(reviewID: $reviewID) {
                reviewID
                review
                stars
                movieID
                adminDeleted
            }
        }
    }
    `;

    const variables = {reviewID};
    const data = await request(GRAPH_QL_URL, query, variables);
    return data;
}

async function updateUser(user) {
    const query = gql`
    mutation ($firstname: String, $lastname: String, $email: String, $password: String, 
        $adminBlocked: Boolean, $loggedIn: Boolean) {

            update_user(input: {
                firstname: $firstname,
                lastname: $lastname,
                email: $email,
                password: $password,
                adminBlocked: $adminBlocked,
                loggedIn: $loggedIn,

            }) {
                firstname
                lastname
                email
                password
                adminBlocked
                loggedIn
            }
    }
    `;

    const variables = user;
    const data = await request(GRAPH_QL_URL, query, variables);
    return data.update_user;
}

async function updateReview(review){
    const query = gql`
    mutation ($reviewID: Int, $review: String, $stars: Int, $movieID: Int, $adminDeleted: Boolean) {
        update_review(input: {
            reviewID: $reviewID,
            review: $review,
            stars: $stars,
            movieID: $movieID,
            adminDeleted: $adminDeleted
        }) {
            reviewID
            review
            stars
            movieID
            adminDeleted
        }
        
    }`;

    const variables = review;
    const data = await request(GRAPH_QL_URL, query, variables);
    return data.update_review;
}

async function createMovie(movie){
    const query = gql`
    mutation ($movieID: Int, $name: String, $director: String, $plot: String, $yearReleased: String) {
        create_movie(input: {
            movieID: $movieID,
            name: $name,
            director: $director,
            plot: $plot,
            yearReleased: $yearReleased
        }) {
            movieID
            name
            director
            plot
            yearReleased
        }
        
    }`;

    const variables = movie;
    const data = await request(GRAPH_QL_URL, query, variables);
    return data.create_movie;
}

async function updateMovie(movie){
    const query = gql`
    mutation ($movieID: Int, $name: String, $director: String, $plot: String, $yearReleased: String) {
        update_movie(input: {
            movieID: $movieID,
            name: $name,
            director: $director,
            plot: $plot,
            yearReleased: $yearReleased
        }) {
            movieID
            name
            director
            plot
            yearReleased
        }
        
    }`;

    const variables = movie;
    const data = await request(GRAPH_QL_URL, query, variables);
    return data.update_movie;
}

export {
    getUsers,
    getMovies,
    getReviews,
    getUser,
    getMovie,
    getReview,
    updateUser,
    createMovie,
    updateReview,
    updateMovie
}
