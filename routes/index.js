const router = require('express').Router();
const { getHomePage } = require('../controllers/homeController');
const { signUp, login, logout } = require('../controllers/userController');
const { getDashboard } = require('../controllers/dashboardController');
const { getPost } = require('../controllers/postController');  // Correctly include the post controller
const userRoutes = require('./api/userRoutes');
const blogpostRoutes = require('./api/blogpostRoutes');
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

// Use API routes
router.use('/api/users', userRoutes);
router.use('/api/blogposts', blogpostRoutes);
router.use('/api/comments', commentRoutes);

module.exports = router;