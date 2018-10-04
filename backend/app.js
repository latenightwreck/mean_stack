const express = require('express');

const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS');
  next();
})

app.use('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: '33432143',
      title: 'First Server side post',
      content: 'This is coming from the server'
    },
    {
      id: '4543645',
      title: 'Second Server side post',
      content: 'This is coming from the server too!'
    },
  ]
  res.status(200).json(posts)
})

module.exports = app;
