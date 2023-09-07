const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Render homepage with existing blog posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll();
    // Render the homepage view with posts
    res.render('home', { posts });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Render a single post and its comments
router.get('/post/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findByPk(postId, {
      include: [Comment],
    });
    // Render the post details view with post and comments
    res.render('post', { post });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});


module.exports = router;
