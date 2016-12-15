'use strict'
module.exports.config = {
  specs: ['./**/*_test.js'],
  framework: 'jasmine',
  mochaOpts: {
    reporter: 'spec',
    slow: 3000,
    enableTimeouts: false
  },
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true
}