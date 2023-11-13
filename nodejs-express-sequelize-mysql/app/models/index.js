const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.movies = require("./movie.model.js")(sequelize, Sequelize);
db.reviews = require("./review.model.js")(sequelize, Sequelize);
db.reservations = require("./reservation.model.js")(sequelize, Sequelize);
db.sessions = require("./session.model.js")(sequelize, Sequelize);

// Reviews, Users, Movies Relationship
db.reviews.belongsTo(db.users, {foreignKey: 'email'});
db.users.hasMany(db.reviews, {foreignKey: 'email'});
db.reviews.belongsTo(db.movies, {foreignKey: 'movieID'});
db.movies.hasMany(db.reviews, {foreignKey: 'movieID'});

// Reservation Relationship
db.reservations.belongsTo(db.users, {foreignKey: 'email'});
db.reservations.belongsTo(db.movies, {foreignKey: 'movieID'});

db.sync = async () => {
  await db.sequelize.sync();
};


module.exports = db;
