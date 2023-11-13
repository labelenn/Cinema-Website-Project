module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
        reviewID: {
            primaryKey: true,
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true
        },
        
        stars: {
            type: Sequelize.INTEGER,
            allowNull: false
        },

        review: {
            type: Sequelize.STRING,
            allowNull: false
        },
        adminDeleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        }
    });
  
    return Review;
  };