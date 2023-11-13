const db = require("../models");
const session = db.sessions;
const Op = db.Sequelize.Op;

// Create and Save a new session
exports.create = (req, res) => {
  // Validate fields
  if (!req.body.stars || !req.body.session || !req.body.movieID || !req.body.sessionID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a session
  const session = {
    sessionID: req.body.sessionID,
    time: req.body.time,
    availableSeats: req.body.availableSeats,
  };

  // Save session in the database
  session.create(session)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the session."
      });
    });
};

// Retrieve all sessions from the database.
exports.findAll = (req, res) => {

  session.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Sessions."
      });
    });
};

// Find a single session with a sessionID
exports.findOne = (req, res) => {
  const sessionID = req.params.sessionID;

  session.findByPk(sessionID)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Session with sessionID=" + sessionID
      });
    });
};

// Update a session by the sessionID in the request
exports.update = (req, res) => {
  const sessionID = req.params.sessionID;

  session.update(req.body, {
    where: { sessionID: sessionID }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "session was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update session with sessionID=${sessionID}. Maybe Session was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating session with sessionID=${sessionID}"
      });
    });
};

// Delete a session with the specified sessionID in the request
exports.delete = (req, res) => {
  const id = req.params.sessionID;

  session.destroy({
    where: { sessionID: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "session was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete session with sessionID=${sessionID}. Maybe Session was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete session with sessionID=${sessionID}"
      });
    });
};

// Delete all sessions from the database.
exports.deleteAll = (req, res) => {
  session.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Sessions were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Sessions."
      });
    });
};
