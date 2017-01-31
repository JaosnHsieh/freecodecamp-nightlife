var request = require('request');
var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/api', router);
};

router.post('/going', function (req, res) {
  if (req.isAuthenticated()) {

    db.Place.findOrCreate({
      where: {
        place_id: req.body.place_id
      }
    }).then(function (place) {
      let Place = db.Place.build();
      Place.place_id = req.body.place_id;
      Place.address = req.body.address;
      Place.name = req.body.name;
      Place.save().then(function (place) {

        db.UserPlaceXREF.findOne({
          where: {
            user_id: req.user.id,
            place_id: place.place_id
          }
        }).then(function (xref) {
          if (xref) { //有找到 刪除紀錄 
            xref.destroy();
            res.json({
              added: false
            });
          } else { //沒找到 新增記錄
            var newXref = db.UserPlaceXREF.build();
            newXref.user_id = req.user.id;
            newXref.place_id = place.place_id;
            newXref.save()
              .then(function () {
                res.json({
                  added: true
                });
              });
          }

        });

      });

    });
  } else //not authenticated 
  {
    res.sendStatus(302);

  }

});

router.get('/restaurants', function (req, res) {
  if(!req.isAuthenticated()){
    req.session.lastKeywords = req.query.keywords;
  }
  var keywords = req.query.keywords;
  keywords = encodeURIComponent(keywords);

 // replace put your api key below after &key=

  var url = `
  https://maps.googleapis.com/maps/api/place/textsearch/json?query=
  + ${keywords} + &types=bar|restaurant|cafe&key=YourAPIKey
  `;
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      //丟給mysql算 每個place有幾個 再加回google給我的body.results[i].my_places_count裡面
      var parsedBody = JSON.parse(body);
      var results = parsedBody.results;

      var promiseArr = [];

      for (var key in results) {
        var result = results[key];
        promiseArr.push(db.UserPlaceXREF.findAndCountAll({
          where: {
            place_id: result.place_id
          }
        }));
      }

      Promise.all(promiseArr).then(function (values) {
        for (var key in results) {
          results[key].my_place_count = values[key].count; //總共幾個人點going

          //如果已經登入並有找到這個USER點過的places 就在這個place加上一個user_clicked=true
          if(req.isAuthenticated() && values[key].rows.length>0){
              for(var key2 in values[key].rows){
                  if(values[key].rows[key2].user_id == req.user.id ){
                    results[key].user_clicked=true;  //這名user如果點過 就多給一個user_clicked的屬性
                  }
                  else{
                    results[key].user_clicked=false;
                  }
              }
          }
          else{
            results[key].user_clicked=false; //這名user沒點過
          }

        }
        res.json(parsedBody);
      });;

    } else {
      res.sendStatus(404);
    }

  });


});
