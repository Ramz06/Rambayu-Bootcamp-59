'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      Blog.belongsTo(models.User, { foreignKey: 'username', as: 'user' });
    }
  }
  Blog.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageurl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    blogDuration: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    postedTime: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users', // Sesuai nama tabel User
        key: 'username'
      }
    }
  }, {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs',
    freezeTableName: true
  });
  return Blog;
};
