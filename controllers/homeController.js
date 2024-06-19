const { BlogPost, User, Comment } = require('../models');

const getHomePage = async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    const blogPosts = blogPostData.map((post) => post.get({ plain: true }));

    res.render('home', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { getHomePage };