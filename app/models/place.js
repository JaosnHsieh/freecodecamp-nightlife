// Example model


module.exports = function (sequelize, DataTypes) {

  var Place = sequelize.define('Place', {
    place_id: DataTypes.STRING,
    address:DataTypes.STRING,
    name:DataTypes.STRING,
    photo_html_attributions:DataTypes.STRING

  }, {
    classMethods: {
      associate: function (models) {
        //   Place.hasMany(models.User);
        // example on how to add relations
        // Article.hasMany(models.Comments);
      }
    }
  });

  return Place;
};

