const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Create a new post
router.post('/posts', async (req, res) => {
  try {
    // Ensure the user is authenticated before creating a post
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }

    const { title, content } = req.body;
    const userId = req.user.id; // Get the logged-in user's ID

    const newPost = await Post.create({
      title,
      content,
      user_id: userId,
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update a user's own post
router.put('/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;

    // Find the post by ID and ensure the user is the owner
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    if (post.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized.' });
    }

    // Update the post
    post.title = title;
    post.content = content;
    await post.save();

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a user's own post
router.delete('/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;

    // Find the post by ID and ensure the user is the owner
    const post = await Post.findByPk(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }
    if (post.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized.' });
    }

    // Delete the post
    await post.destroy();

    res.json({ message: 'Post deleted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
