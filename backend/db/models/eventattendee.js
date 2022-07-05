'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventAttendee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      EventAttendee.belongsTo(models.User, { foreignKey: "userId" });
      EventAttendee.belongsTo(models.Event, { foreignKey: "eventId" });
    }
  }
  EventAttendee.init({
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    attendingStatus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'EventAttendee',
  });
  return EventAttendee;
};