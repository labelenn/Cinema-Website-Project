const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

const graphql = require('./app/graphql');
const { graphqlHTTP } = require('express-graphql');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphql.schema,
    rootValue: graphql.root,
    graphiql: true
  })
)

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to node, express and sequelize app" });
});

require("./app/routes/user.routes")(app);
require("./app/routes/review.routes")(app);
require("./app/routes/movie.routes")(app);
require("./app/routes/session.routes")(app);
require("./app/routes/reservation.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
