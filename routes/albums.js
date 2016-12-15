var express = require('express');
var router = express.Router();
const path = require('path')
const database = require(path.resolve('config/database'))

const albumsCollection = database.get('albums')

/* GET users listing. */
router.get('/', function(req, res, next) {
  albumsCollection.find({}, (err,albums) => {
  res.render('albums/index', {albums:albums})
  })
})

module.exports = router
