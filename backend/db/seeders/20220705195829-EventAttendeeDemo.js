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
        userId: 2,
        eventId: 3,
        attendingStatus: "pending"
      },
      {
        userId: 2,
        eventId: 4,
        attendingStatus: "pending"
      },
      {
        userId: 2,
        eventId: 5,
        attendingStatus: "pending"
      },
      {
        userId: 1,
        eventId: 5,
        attendingStatus: "pending"
      },
      {
        userId: 1,
        eventId: 4,
        attendingStatus: "pending"
      },
      {
        userId: 1,
        eventId: 3,
        attendingStatus: "pending"
      },
            {
        userId: 1,
        eventId: 2,
        attendingStatus: "pending"
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('EventAttendees', {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
