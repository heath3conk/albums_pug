var express = require('express');
var router = express.Router();
const path = require('path')
const database = require(path.resolve('config/database'))

const albumsCollection = database.get('albums')

/* GET users listing. */
router.get('/', (req, res, next) => {
  albumsCollection.find({}, (err,albumsList) => {
  res.render('albums/index', {albums: albumsList})
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

router.get('/:id', (req, res, next) => {
  albumsCollection.find({_id: req.params.id}, (err, album) => {
    res.render('albums/show', {album: album[0]})
  })
})

router.delete('/:id', (req, res, next) => {
  albumsCollection.remove( { _id: req.params.id }, (err, removedAlbum) => {
    if(err) {
      next(err)
      return
    }
      res.redirect('/albums')
    })
})

router.get('/:id/edit', (req, res, next) => {
  albumsCollection.find({_id: req.params.id}, (err, album) => {
    if(err) {
      next(err)
      return
    }
    res.render('albums/update', {album: album[0]})
  })
})

module.exports = router
