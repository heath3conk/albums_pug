'use strict'

const monk = require('monk')

const databaseName = 'albums_' + (process.env.NODE_ENV || 'development')
const database = monk('localhost/' + databaseName)

module.exports = database