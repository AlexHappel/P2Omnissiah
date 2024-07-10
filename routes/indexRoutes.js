const router = require('express').Router();
const { getHomePage } = require('../controllers/homeController');
const { getDashboard } = require('../controllers/dashboardController');
const { getPost } = require('../controllers/blogPostController');  // Correctly include the post controller
const userRoutes = require('./api/userRoutes');
const blogPostRoutes = require('./api/blogPostRoutes');
const commentRoutes = require('./api/commentRoutes');
const withAuth = require('../utils/auth');

// Home route
router.get('/', getHomePage);

// Dashboard route
router.get('/dashboard', withAuth, getDashboard);

// Login route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

// Post details route
router.get('/post/:id', getPost);

// Edit post route
router.get('/edit/:id', withAuth, getPost);  // Add this line

// Use API routes
router.use('/api/users', userRoutes);
router.use('/api/blogposts', blogPostRoutes);
router.use('/api/comments', commentRoutes);

module.exports = router;
