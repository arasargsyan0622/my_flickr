'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      type: DataTypes.TEXT(255),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
  };
  return Comment;
};