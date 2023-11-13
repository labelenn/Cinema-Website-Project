module.exports = app => {
  const user = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", user.create);

  // Retrieve all user
  router.get("/", user.findAll);

  // Log in user
  router.put("/login/:email", user.login)

  // Retrieve logged in user
  router.get("/loggedIn", user.findLoggedInUser);

  // Log out user
  router.put("/logout/:email", user.logout);

  // Retrieve a single User with email
  router.get("/:email", user.findOne);

  // Update a User with email
  router.put("/update/:email", user.update);

  // Delete a User with email
  router.delete("/:email", user.delete);

  // Delete all user
  router.delete("/", user.deleteAll);

  app.use('/api/user', router);
};
