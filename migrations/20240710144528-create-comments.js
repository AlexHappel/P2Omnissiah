'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comment', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comment_text: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'user',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      blogpost_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'blogpost',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comment');
  }
};