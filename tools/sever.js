/* eslint-env node */
const express = require('express')
const {resolve} = require('path')
const serveStatic = require('serve-static')
let port = process.env.PORT || 5000

var app = express()
app.use(serveStatic(resolve(__dirname, '../build')))

app.listen(port)
