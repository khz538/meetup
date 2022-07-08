'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Event.belongsToMany(models.User, { through: models.EventAttendee, onDelete: "CASCADE" });
      Event.hasMany(models.Image, { foreignKey: "eventId", onDelete: "CASCADE" });
      Event.belongsTo(models.Venue, { foreignKey: "venueId" });
      Event.belongsTo(models.Group, {
        foreignKey: "groupId",
      });
      Event.hasMany(models.EventAttendee, { foreignKey: "eventId", onDelete: "CASCADE", as: "Attendance" });
    }
  }
  Event.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: ['Online', 'In person'],
      }
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: sequelize.fn('NOW')
      }
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        endDateAfterStartDate(value) {
          if (value < this.startDate) {
            throw new Error('Must be after start date');
          }
        }
        // isAfter: this.startDate,
      }
    },
    numAttending: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    previewImage: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Event',
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'endDate', 'price']
      }
    }
  });
  return Event;
};