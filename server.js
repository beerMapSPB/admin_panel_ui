/* eslint-disable */
const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const history = require('connect-history-api-fallback')

const app = express()
const port = process.env.PORT || 80

app.use(history({
  verbose: true
}))
app.use(express.static('dist'));
app.get('/', (req, res) => {
  res.sendFile('index.html');
});
app.listen(port)
