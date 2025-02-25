'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('blogs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      imageurl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      blogDuration: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      postedTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'users', // Nama tabel User
          key: 'username',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('blogs');
  },
};
