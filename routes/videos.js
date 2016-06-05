var express = require('express');
var router = express.Router();

var monk = require('monk');
var db = monk('localhost:27017/vidzy');
var collection = db.get('videos');

router.get('/', function(req, res) {
  collection.find({}, function(err, videos) {
    if (err) throw err;
    res.json(videos);
  });
});

router.post('/', function(req, res) {
  collection.insert({
    title: req.body.title,
    description: req.body.description,
  }, function(err, video) {
    if (err) throw err;
    res.json(video);
  });
});

router.get('/:id', function(req, res) {
  console.log(req.params.id)
  collection.findOne({ _id: req.params.id }, function(err, video) {
    if (err) throw err;
    res.json(video);
  });
});

router.put('/:id', function(req, res) {
  collection.update({
    _id: req.params.id
  },
  {
    title: req.body.title,
    description: req.body.description
  }, function(err, video) {
    if (err) throw err;
    res.json(video);
  });
});

module.exports = router;