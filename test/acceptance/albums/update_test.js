'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))
const database = require(path.resolve('config/database'))

const albumsCollection = database.get('albums')

describe('Express CRUD', () => {
  beforeAll(() => {
    const server = http.createServer(app)
    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    browser.ignoreSynchronization = true
  })


  describe('Given the Edit Album: page', () =>{
    let albumId

    beforeEach((done) => {
      albumsCollection.insert({
        album: "Somethin Else",
        artist: "Cannonball Adderley",
        genre: "Jazz",
        stars: 4,
        explicit: 0
      }, (err, newAlbum) => {
        albumId = newAlbum._id
        done(err)
      })
    })

    afterEach((done) => {
      albumsCollection.remove()
      done()
    })

    it('has a header, genre, artist, edit link', () => {
      browser.get('/albums/#{albumId}/edit')
      expect(element(by.css('input[name=artist]')).getText()).toEqual('Cannonball Adderley')
      expect(element(by.css('input[name=album]')).getText()).toEqual('Somethin Else')
      expect(element(by.css('input[name=stars]')).getText()).toEqual('4')
      expect(element(by.css('input[name=genre]')).getText()).toEqual('Jazz')
      expect(element(by.css('input[name=explicit]')).getText()).toEqual('0')
    })
  })
})
