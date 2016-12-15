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

  describe('Given I visit /albums', () => {
    it('Then I see Albums title and New Album link', () => {
      browser.get('/albums')
      expect(element(by.tagName('h1')).getText()).toEqual('Albums')
      expect(element(by.tagName('a')).getAttribute('href').getText()).toEqual('New Album')
      expect(element(by.tagName('a')).getAttribute('href')).toContain('/albums/new')
    })
  })
})

describe('There is a collection of albums', () => {
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

  describe('Given I visit /albums', () => {
    it('Then I see an album in a table', () => {
      browser.get('/albums')
      element.all(by.tagName('th')).then((headers) => {
        expect(headers[0].getText()).toContain('Album')
        expect(headers[1].getText()).toContain('Artist')
        expect(headers[2].getText()).toContain('Genre')
      })
      element.all(by.tagName('td')).then((data) => {
        expect(data[0].getText()).toContain('Kind of Blue')
        // stretch class test
        //expect(data[0].getAttribute('class').getText()).toEqual('album-title')
        expect(data[1].getText()).toContain('Miles Davis')
        expect(data[2].getText()).toContain('Jazz')
      })

      element.all(by.tagName('a')).then((links) => {
        expect(links[1].getAttribute('href').getText()).toEqual('Kind of Blue')
        expect(links[1].getAttribute('href')).toContain('/albums/' + albumId)
      })
      element.all(by.css(''))
    })
  })
})