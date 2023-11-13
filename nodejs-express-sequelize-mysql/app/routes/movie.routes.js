module.exports = app => {
    const movie = require("../controllers/movie.controller.js");
  
    var router = require("express").Router();
  
    // Create a new movie
    router.post("/", movie.create);
  
    // Retrieve all movie
    router.get("/", movie.findAll);
  
    // Retrieve a single movie with movieID
    router.get("/:movieID", movie.findOne);
  
    // Update a movie with movieID
    router.put("/update/:movieID", movie.update);
  
    // Delete a movie with movieID
    router.delete("/:movieID", movie.delete);
  
    // Delete all movie
    router.delete("/", movie.deleteAll);
  
    app.use('/api/movie', router);
  };
  