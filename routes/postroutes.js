const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Get all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new post
router.post('/posts', async (req, res) => {
  // Handle creating a new post here
  try {
        const posts = await Post.findAll();
        res.json(posts);
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
});

// Update a post
router.put('/posts/:id', async (req, res) => {
  try {
        const posts = await Post.findAll();
        res.json(posts);
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
});

// Delete a post
router.delete('/posts/:id', async (req, res) => {
  // Handle deleting a post here
  try {
        const posts = await Post.findAll();
        res.json(posts);
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
});

module.exports = router;
