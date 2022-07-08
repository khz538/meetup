'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('EventAttendees', [
      {
        userId: 1,
        eventId: 1,
        attendingStatus: "member"
      },
      {
        userId: 2,
        eventId: 2,
        attendingStatus: "member"
      },
      {
        userId: 3,
        eventId: 3,
        attendingStatus: "waitlist"
      },
      {
        userId: 4,
        eventId: 3,
        attendingStatus: "member"
      },
      {
        userId: 2,
        eventId: 1,
        attendingStatus: "pending"
      },
      {
        userId: 3,
        eventId: 1,
        attendingStatus: "waitlist"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('EventAttendees', {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
