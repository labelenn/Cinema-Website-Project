module.exports = app => {
    const reservation = require("../controllers/reservation.controller.js");
  
    var router = require("express").Router();
  
    // Create a new reservation
    router.post("/", reservation.create);
  
    // Retrieve all reservation
    router.get("/", reservation.findAll);
  
    // Retrieve a single reservation with reservationID
    router.get("/:reservationID", reservation.findOne);
  
    // Update a reservation with reservationID
    router.put("/update/:reservationID", reservation.update);
  
    // Delete a reservation with reservationID
    router.delete("/:reservationID", reservation.delete);
  
    // Delete all reservation
    router.delete("/", reservation.deleteAll);
  
    app.use('/api/reservation', router);
  };
  