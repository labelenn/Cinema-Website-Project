module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define("session", {
        sessionID: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false
        },

        time: {
            primaryKey: true,
            type: Sequelize.STRING,
            allowNull: false,
        },

        availableSeats: {
            type: Sequelize.INTEGER,
            allowNull: false
        } 
    });
  
    return Session;
  };