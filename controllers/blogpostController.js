const { BlogPost, User, Comment } = require('../models');

const createBlogPost = async (req, res) => {
  try {
    const newPost = await BlogPost.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
};

const updateBlogPost = async (req, res) => {
  try {
    const updatedPost = await BlogPost.update(
      {
        title: req.body.title,
        content: req.body.content,
        edited: true,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );

    if (!updatedPost[0]) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteBlogPost = async (req, res) => {
  try {
    const postData = await BlogPost.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    console.error('Error deleting post:', err);  // Log the error
    res.status(500).json(err);
  }
};

const getPost = async (req, res) => {
  try {
    console.log(`Fetching post with id ${req.params.id}`);
    const postData = await BlogPost.findByPk(req.params.id, {
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

    if (!postData) {
      console.log('No post found with this id');
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    const post = postData.get({ plain: true });
    console.log('Post data:', post);

    res.render('editPost', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error fetching post for edit:', err);  // Log the error
    res.status(500).json(err);
  }
};

module.exports = { createBlogPost, updateBlogPost, deleteBlogPost, getPost };