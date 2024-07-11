const router = require('express').Router();
const { createBlogPost, updateBlogPost, deleteBlogPost, getPost } = require('../../controllers/blogPostController');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, createBlogPost);
router.put('/:id', withAuth, updateBlogPost);
router.delete('/:id', withAuth, deleteBlogPost);
router.get('/edit/:id', withAuth, getPost);  

module.exports = router;