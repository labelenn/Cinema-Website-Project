module.exports = app => {
    const review = require("../controllers/review.controller.js");
  
    var router = require("express").Router();
  
    // Create a new review
    router.post("/", review.create);
  
    // Retrieve all review
    router.get("/", review.findAll);

    // Retrieve all review by email
    router.get("/all-by-email/:email", review.findAllByEmail);
  
    // Retrieve a single review with reviewID
    router.get("/:reviewID", review.findOne);
  
    // Update a review with reviewID
    router.put("/update/:reviewID", review.update);
  
    // Delete a review with reviewI
    router.delete("/:reviewID", review.delete);
  
    // Delete all review
    router.delete("/", review.deleteAll);
  
    app.use('/api/review', router);
  };
  