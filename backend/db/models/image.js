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
        // onDelete: "CASCADE",
      });
      Image.belongsTo(models.Event, {
        foreignKey: "eventId",
        // onDelete: "CASCADE",
        // as: "images"
      });
      Image.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Image.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eventId: {
      type: DataTypes.INTEGER,
      validate: {
        eitherOr (value) {
          if (this.groupId) throw new Error('Can only have either eventId or groupId');
        }
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      validate: {
        eitherOr (value) {
          if (this.eventId) throw new Error('Can only have either eventId or groupId');
        }
      }
    },
    url: { type: DataTypes.STRING, allowNull: false }
  }, {
    sequelize,
    modelName: 'Image',
    defaultScope: {
      attributes: {
        include: ['url']
      }
    },
  });
  return Image;
};
