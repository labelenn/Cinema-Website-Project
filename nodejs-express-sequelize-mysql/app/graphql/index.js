const { buildSchema } = require('graphql');
const db = require("../models");

const graphql = { };

graphql.schema = buildSchema(`
    type User {
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        adminBlocked: Boolean,
        loggedIn: Boolean,
        reviews: [Review],
        createdAt: String,
        updatedAt: String
    }

    type Movie {
        movieID: Int,
        name: String,
        director: String,
        plot: String,
        yearReleased: String,
        createdAt: String,
        updatedAt: String
    }

    type Review {
        reviewID: Int,
        review: String,
        stars: Int,
        movieID: Int,
        adminDeleted: Boolean,
    }

    input UserInput {
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        adminBlocked: Boolean,
        loggedIn: Boolean,
    }

    input MovieInput {
        movieID: Int,
        name: String,
        director: String,
        plot: String,
        yearReleased: String,
    }

    input ReviewInput {
        reviewID: Int,
        review: String,
        stars: Int,
        movieID: Int,
        adminDeleted: Boolean
    }

    type Query {
        all_users: [User],
        user(email: String): User,
        all_movies: [Movie],
        movie(movieID: Int): Movie,
        all_reviews: [Review],
        review(reviewID: Int): Review
    }

    type Mutation {
        update_user(input: UserInput): User,
        create_movie(input: MovieInput): Movie,
        update_review(input: ReviewInput): Review
        update_movie(input: MovieInput): Movie
    }
`);

graphql.root = {
    // Queries
    all_users: async () => {
        const users = await db.users.findAll({include: {model: db.reviews, as: "reviews"}});
        return users;
    },

    user: async ({ email }) => {
        const user = await db.users.findOne({ where: { email: email } });
        return user;
    },

    all_movies: async () => {
        const movies = await db.movies.findAll({include: {model: db.reviews, as: "reviews"}});
        return movies;
    },

    movie: async ({ movieID }) => {
        const movie = await db.movies.findOne({ where: { movieID: movieID } });
        return movie;
    },

    all_reviews: async () => {
        const reviews = await db.reviews.findAll();
        return reviews;
    },

    review: async ({ reviewID }) => {
        const review = await db.reviews.findOne({ where: { reviewID: reviewID } });
        return review;
    },

    // Mutations
    update_user: async (args) => {
        
        const user = await db.users.findOne({ where: { email: args.input.email } });
        
        user.adminBlocked = args.input.adminBlocked;

        await user.save();
        return user;
    },

    update_review: async (args) => {
        const review = await db.reviews.findOne({ where: { reviewID: args.input.reviewID } });
        
        review.adminDeleted = args.input.adminDeleted;

        await review.save();
        return review;
    },

    create_movie: async (args) => {
        const movie = await db.movies.create({
            movieID: args.input.movieID,
            name: args.input.name,
            director: args.input.director,
            plot: args.input.plot,
            yearReleased: args.input.yearReleased
        });
        return movie;
    },

    update_movie: async (args) => {
        const movie = await db.movies.findOne({ where: { movieID: args.input.movieID } });

        movie.name = args.input.name;
        movie.director = args.input.director;
        movie.plot = args.input.plot;
        movie.yearReleased = args.input.yearReleased;
        await movie.save();
        return movie;
    }
};

module.exports = graphql;