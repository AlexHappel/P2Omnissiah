const router = require('express').Router();
const { createComment } = require('../../controllers/commentController');
const withAuth = require('../../utils/auth');

// Comment routes
router.post('/', withAuth, createComment);

module.exports = router;