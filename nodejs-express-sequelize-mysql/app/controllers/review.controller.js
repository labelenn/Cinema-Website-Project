const { where } = require("sequelize");
const db = require("../models");
const Review = db.reviews;
const Op = db.Sequelize.Op;

// Create and Save a new Review
exports.create = (req, res) => {
  // Validate fields
  if (!req.body.stars || !req.body.review || !req.body.movieID || !req.body.email) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Review
  const review = {
    stars: req.body.stars,
    review: req.body.review,
    movieID: req.body.movieID,
    email: req.body.email,
    adminDeleted: req.body.adminDeleted
  };

  // Save Review in the database
  Review.create(review)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Review."
      });
    });
};

// Retrieve all reviews from the database.
exports.findAll = (req, res) => {

  Review.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Retrieve all reviews from the database by email.
exports.findAllByEmail = (req, res) => {
  const email = req.params.email;
  Review.findAll(
    {where: { email: email }}
    )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving reviews by " + email
      });
    });
};


// Find a single review with an email
exports.findOne = (req, res) => {
  const reviewID = req.params.reviewID;

  Review.findByPk(reviewID)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with reviewID=" + reviewID
      });
    });
};

// Update a review by the reviewID in the request
exports.update = (req, res) => {
  const reviewID = req.params.reviewID;

  Review.update(req.body, {
    where: { reviewID: reviewID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Review was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Review with reviewID=${reviewID}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Review with reviewID=${reviewID}"
      });
    });
};

// Delete a review with the specified email in the request
exports.delete = (req, res) => {
  const id = req.params.reviewID;

  Review.destroy({
    where: { reviewID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Review was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Review with reviewID=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Review with reviewID=${reviewID}"
      });
    });
};

// Delete all reviews from the database.
exports.deleteAll = (req, res) => {
  Review.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};
