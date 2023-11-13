module.exports = (sequelize, Sequelize) => {
    const Reservation = sequelize.define("reservation", {
        reservationID: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        
        seats: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        time: {
            type: Sequelize.STRING,
            allowNull: false
        },
    });
  
    return Reservation;
  };