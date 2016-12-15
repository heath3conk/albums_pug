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

  afterEach((done) => {
    albumsCollection.remove()
    done()
  })

  describe('Given I visit the new album page', () => {
    it('Then I see blank album, artist, genre, stars, explicit lyrics fields, and "Create Album" link', () => {
      browser.get('/albums/new')
      element(by.tagName('select')).element(by.cssContainingText('option', 'Jazz')).click()
      element(by.css('input[name=artist]')).sendKeys('Miles Davis')
      element(by.css('input[name=album]')).sendKeys('Kind of Blue')
      element(by.css('input[name=stars][value="5"]')).click()
      element(by.css('input[name=explicit][value="1"]'))
      element(by.css('input[type=submit]')).submit()

      expect(browser.getCurrentUrl()).toMatch(urlRegex)
      // element.all(by.tagName('label')).then((labels) => {
      //   expect(labels[0].getText()).toContain('Artist')
      //   expect(labels[1].getText()).toContain('Album')
      //   expect(labels[2].getText()).toContain('Genre')
      //   expect(labels[3].getText()).toContain('Stars')
      //   expect(labels[4].getText()).toContain('Contains Explicit Lyrics')
      // })
    })
  })
})