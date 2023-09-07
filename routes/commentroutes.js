const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Get all comments for a post
router.get('/comments/:postId', async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await Comment.findAll({
      where: { post_id: postId },
    });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new comment for a post
router.post('/comments', async (req, res) => {
  // Handle creating a new comment here
  try {
        const postId = req.params.postId;
        const comments = await Comment.findAll({
          where: { post_id: postId },
        });
        res.json(comments);
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
});

// Update a comment
router.put('/comments/:id', async (req, res) => {
  // Handle updating a comment here
  try {
        const postId = req.params.postId;
        const comments = await Comment.findAll({
          where: { post_id: postId },
        });
        res.json(comments);
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
});

// Delete a comment
router.delete('/comments/:id', async (req, res) => {
  // Handle deleting a comment here
  try {
        const postId = req.params.postId;
        const comments = await Comment.findAll({
          where: { post_id: postId },
        });
        res.json(comments);
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
});

module.exports = router;
