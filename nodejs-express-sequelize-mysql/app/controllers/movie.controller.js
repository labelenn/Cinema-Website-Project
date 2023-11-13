const db = require("../models");
const Movie = db.movies;
const Op = db.Sequelize.Op;

// Create and Save a new Movie
exports.create = (req, res) => {
  // ValmovieIDate request
  if (!req.body.movieID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Movie
  const Movie = {
    movieID: req.body.movieID,
    name: req.body.name,
    director: req.body.director,
    plot: req.body.plot,
    yearReleased: req.body.yearReleased,
  };

  // Save Movie in the database
  Movie.create(Movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Movie."
      });
    });
};

// Retrieve all Movies from the database.
exports.findAll = (req, res) => {
  const Moviename = req.query.Moviename;
  var condition = Moviename ? { Moviename: { [Op.like]: `%${Moviename}%` } } : null;

  Movie.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Movies."
      });
    });
};

// Find a single Movie with an movieID
exports.findOne = (req, res) => {
  const movieID = req.params.movieID;

  Movie.findByPk(movieID)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving movie with movieID " + movieID
      });
    });
};

// Update a Movie by the movieID in the request
exports.update = (req, res) => {
  const movieID = req.params.movieID;

  Movie.update(req.body, {
    where: { movieID: movieID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Movie was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Movie with movieID=${movieID}. Maybe Movie was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Movie with movieID=" + movieID
      });
    });
};

// Delete a Movie with the specified movieID in the request
exports.delete = (req, res) => {
  const movieID = req.params.movieID;

  Movie.destroy({
    where: { movieID: movieID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Movie was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Movie with movieID=${movieID}. Maybe Movie was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Movie with movieID=" + movieID
      });
    });
};

// Delete all Movies from the database.
exports.deleteAll = (req, res) => {
  Movie.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Movies were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Movies."
      });
    });
};