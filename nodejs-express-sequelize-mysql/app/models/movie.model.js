module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define("movie", {
        movieID: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false
        },

        name: {
            type: Sequelize.STRING,
            allowNull: false
        },

        director: {
            type: Sequelize.STRING,
            allowNull: false
        },
        
        plot: {
            type: Sequelize.STRING,
            allowNull: false
        },

        yearReleased: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
  
    return Movie;
  };
  