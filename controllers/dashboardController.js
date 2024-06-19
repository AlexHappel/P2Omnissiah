const { BlogPost } = require('../models');

const getDashboard = async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      where: {
        user_id: req.session.user_id,
      },
    });

    const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

    res.render('dashboard', { blogPosts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getDashboard };