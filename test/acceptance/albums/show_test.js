'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))
const database = require(path.resolve('config/database'))

const albumsCollection = database.get('albums')
const urlRegex = /\/([a-f\d]{24})$/ig

describe('Express CRUD', () => {
  beforeAll(() => {
    const server = http.createServer(app)
    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    browser.ignoreSynchronization = true
  })


  describe('Given the Showing Album: page', () =>{
    let albumId

    beforeEach((done) => {
      albumsCollection.insert({
        album: "Kind of Blue",
        artist: "Miles Davis",
        genre: "Jazz"
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
      browser.get('/albums/' + albumId)
      expect(element(by.tagName('h1')).getText()).toEqual('Showing Album: Kind of Blue')
      element.all(by.tagName('h2')).then((albumData) => {
        expect(albumData[0].getText()).toContain('Genre: Jazz')
        expect(albumData[1].getText()).toContain('Artist: Miles Davis')
      })
      expect(element(by.tagName('a')).getAttribute('href')).toContain('/albums/' + albumId + '/edit')
      expect(element(by.tagName('a')).getText()).toEqual('Edit')
    })

    it('Then I can delete the album', () => {
      browser.get('/albums/' + albumId)

      element(by.css('input[id=delete]')).click()

      browser.getCurrentUrl().then((url) => {
        expect(url.endsWith('/albums')).toBe(true)

        element.all(by.tagName('td')).then((data) => {
          expect(data.length).toEqual(0)
        })
      })
    })
  })
})
