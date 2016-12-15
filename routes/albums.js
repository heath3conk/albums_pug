var express = require('express');
var router = express.Router();
const path = require('path')
const database = require(path.resolve('config/database'))

const albumsCollection = database.get('albums')

/* GET users listing. */
router.get('/', (req, res, next) => {
  albumsCollection.find({}, (err,albums) => {
  res.render('albums/index', {albums:albums})
  })
})

router.get('/new', (req, res, next) => {
  res.render('albums/new')
})

router.post('/', (req, res, next) => {
  albumsCollection.insert(req.body, (err, album) => {
    res.redirect('albums/' + album._id)
  })
})

module.exports = router
