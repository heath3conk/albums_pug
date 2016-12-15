'use strict'

const path = require('path')
const http = require('http')
const app = require(path.resolve('app'))


describe('Express CRUD', () => {
  beforeAll(() => {
    const server = http.createServer(app)
    server.listen(0)
    browser.baseUrl = 'http://localhost:' + server.address().port
    browser.ignoreSynchronization = true
  })

  describe('Given I visit /', () => {
    it('Then I see OMG Albums', () => {
      browser.get('/')
      expect(element(by.tagName('h1')).getText()).toEqual('OMG Albums')
    })

    it('Then I see a link to the list of albums', () =>{
      browser.get('/')
      expect(element(by.tagName('a')).getAttribute('href').getText()).toEqual('Let me see the RIGHT NOW!')
      expect(element(by.tagName('a')).getAttribute('href')).toContain('/albums')
    })
  })
})