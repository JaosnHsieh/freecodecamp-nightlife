// Example model


module.exports = function (sequelize, DataTypes) {

  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    google_id:DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // User.hasMany(models.Place);
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return User;
};

