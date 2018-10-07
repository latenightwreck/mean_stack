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
    'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
})

app.post('/api/posts', async (req, res, next) => {
  let post = new Post({
    title: req.body.title,
    content: req.body.content
  })

  post = await post.save()

  res.status(201).json({
    message: "This is a message!",
    post: post
  });
})

app.put('/api/posts/:id', async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content
  });
  res.status(200).json({
    message: 'Update successful'
  })

})

app.delete('/api/posts/:id', async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: 'Post deleted!',
    post: post
  })
})

app.get('/api/posts', async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    message: "Post Data",
    posts: posts
  })
})

app.get('/api/posts/:id', (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {

      if (!post) {
        return res.status(404).json({
          message: 'Post not found!'
        })
      }

      console.log(post)

      res.status(200).send(post)
    });
})

module.exports = app;
