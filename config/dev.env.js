'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  APIKEY: '"7ed644f7633a509037fe5a8569bbd33d"',
})
