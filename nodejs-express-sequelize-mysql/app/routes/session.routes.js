module.exports = app => {
    const session = require("../controllers/session.controller.js");
  
    var router = require("express").Router();
  
    // Create a new session
    router.post("/", session.create);
  
    // Retrieve all session
    router.get("/", session.findAll);
  
    // Retrieve a single session with sessionID
    router.get("/:sessionID", session.findOne);
  
    // Update a session with sessionID
    router.put("/update/:sessionID", session.update);
  
    // Delete a session with sessionID
    router.delete("/:sessionID", session.delete);
  
    // Delete all session
    router.delete("/", session.deleteAll);
  
    app.use('/api/session', router);
  };
  