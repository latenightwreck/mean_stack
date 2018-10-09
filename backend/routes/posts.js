const express = require('express');
const router = express.Router();
const multer = require('multer');
const Post = require('../models/post');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error('Invalid mime type.');
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  },

});

router.post('/', multer({storage: storage}).single('image'), async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  let post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + '/images/' + req.file.filename
  })

  post = await post.save()

  res.status(201).json({
    message: "This is a message!",
    post: post
  });
})

router.put('/:id', multer({ storage: storage }).single('image'), async (req, res, next) => {
  let imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get('host');
    imagePath = url + '/images/' + req.file.filename;;
  }
  const post = await Post.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content,
    imagePath: req.body.imagePath
  });
  res.status(200).send(post)

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
