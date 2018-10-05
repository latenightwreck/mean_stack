const express = require('express');
const bodyParser = require('body-parser');
const Post = require('./models/post');
const mongoose = require('mongoose')

const app = express();

mongoose.connect('mongodb://localhost:27017/mean_stack', { useNewUrlParser: true })

app.use(bodyParser.json())

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

app.post('/api/posts', async (req, res, next) => {
  let post = new Post({
    title: req.body.title,
    content: req.body.content
  })

  await post.save()

  res.status(201).json({
    message: "This is a message!"
  });
})

app.use('/api/posts', async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).send(posts)
})

module.exports = app;
