'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.Group, {
        foreignKey: "groupId",
        onDelete: "CASCADE",
      });
      Image.belongsTo(models.Event, {
        foreignKey: "groupId",
        onDelete: "CASCADE",
      });
    }
  }
  Image.init({
    eventId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};