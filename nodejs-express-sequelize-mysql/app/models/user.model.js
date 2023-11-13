module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      primaryKey: true,
      type: Sequelize.STRING,
      allowNull: false
    },
    
    firstname: {
        type: Sequelize.STRING,
      allowNull: false
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    adminBlocked: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    loggedIn: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  });

  return User;
};
