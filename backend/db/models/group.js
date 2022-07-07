'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Group.belongsToMany(models.User, {
      //   through: models.GroupMember,
        //  // as: "Membership"
      // });
      Group.belongsTo(models.User, { foreignKey: "organizerId" });
      Group.hasMany(models.Image, { foreignKey: "groupId",
        onDelete: "CASCADE", as: "Image"
      });
      Group.hasMany(models.Event, { foreignKey: "groupId", onDelete: "CASCADE" });
      Group.hasMany(models.GroupMember, {
        foreignKey: "groupId",
        onDelete: "CASCADE",
      });
    }
  }
  Group.init({
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      unique: true,
    },
    about: {
      type: DataTypes.STRING,
      validate: {
        len: [50, 9999]
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        isIn: [['Online', 'In person']],
        // onlineOrInPerson(value) {
        //   if (value !== 'Online' && value !=='In person') {
        //     throw new Error('Type must be Online or In person');
        //   }
        // }
      }
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    numMembers: {
      type: DataTypes.INTEGER,
    },
    previewImage: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};