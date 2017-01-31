// Example model


module.exports = function (sequelize, DataTypes) {

  var UserPlaceXREF = sequelize.define('UserPlaceXREF', {
    place_id: DataTypes.STRING,
    user_id:DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return UserPlaceXREF;
};

