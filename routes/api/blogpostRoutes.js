const router = require('express').Router();
const { createBlogPost, updateBlogPost, deleteBlogPost } = require('../../controllers/blogpostController');
const withAuth = require('../../utils/auth');

// Blog post routes
router.post('/', withAuth, createBlogPost);
router.put('/:id', withAuth, updateBlogPost);
router.delete('/:id', withAuth, deleteBlogPost);

module.exports = router;