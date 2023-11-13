const db = require("../models");
const Reservation = db.reservations;
const Op = db.Sequelize.Op;

// Create and Save a new reservation
exports.create = (req, res) => {
  // Validate fields
  if (!req.body.seats || !req.body.time || !req.body.email || !req.body.movieID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a reservation
  const reservation = {
    seats: req.body.seats,
    time: req.body.time,
    email: req.body.email,
    movieID: req.body.movieID,
  };

  // Save reservation in the database
  Reservation.create(reservation)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the reservation."
      });
    });
};

// Retrieve all reservations from the database.
exports.findAll = (req, res) => {

  Reservation.findAll()
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

// Find a single reservation with an reservationID
exports.findOne = (req, res) => {
  const reservationID = req.params.reservationID;

  Reservation.findByPk(reservationID)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with reservationID=" + reservationID
      });
    });
};

// Update a reservation by the reservationID in the request
exports.update = (req, res) => {
  const reservationID = req.params.reservationID;

  Reservation.update(req.body, {
    where: { reservationID: reservationID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "reservation was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update reservation with reservationID=${reservationID}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating reservation with reservationID=${reservationID}"
      });
    });
};

// Delete a reservation with the specified reservationID in the request
exports.delete = (req, res) => {
  const id = req.params.reservationID;

  Reservation.destroy({
    where: { reservationID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "reservation was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete reservation with reservationID=${reservationID}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete reservation with reservationID=${reservationID}"
      });
    });
};

// Delete all reservations from the database.
exports.deleteAll = (req, res) => {
  Reservation.destroy({
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
