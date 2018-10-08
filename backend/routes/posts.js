const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.post('/', async (req, res, next) => {
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

router.put('/:id', async (req, res, next) => {
  const post = await Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content
  });
  res.status(200).json({
    message: 'Update successful'
  })

})

router.delete('/:id', async (req, res, next) => {
  const post = await Post.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: 'Post deleted!',
    post: post
  })
})

router.get('/', async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({
    message: "Post Data",
    posts: posts
  })
})

router.get('/:id', (req, res, next) => {
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

module.exports = router;
