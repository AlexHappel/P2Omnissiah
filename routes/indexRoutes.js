const router = require('express').Router();
const { getHomePage } = require('../controllers/homeController');
const { getDashboard } = require('../controllers/dashboardController');
const { getPost } = require('../controllers/blogPostController');
const userRoutes = require('./api/userRoutes');
const blogpostRoutes = require('./api/blogPostRoutes');
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
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('editPost', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use API routes
router.use('/api/users', userRoutes);
router.use('/api/blogposts', blogpostRoutes);
router.use('/api/comments', commentRoutes);

module.exports = router;