'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT(255),
    },
    imageUrl: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    albumId: {
      type: DataTypes.INTEGER,
    }
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
  };
  return Image;
};
