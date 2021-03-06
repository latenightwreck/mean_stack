const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const postRoutes = require('./routes/posts')

const app = express();

mongoose.connect('mongodb://localhost:27017/mean_stack', { useNewUrlParser: true })

app.use(bodyParser.json())
app.use('/images', express.static(__dirname + '/images'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
})

app.use('/api/posts', postRoutes);

module.exports = app;
