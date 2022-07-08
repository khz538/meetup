'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        userId: 3,
        eventId: 1,
        groupId: null,
        url: '1',
      },
      {
        userId: 1,
        eventId: 2,
        groupId: null,
        url: '2',
      },
      {
        userId: 2,
        eventId: null,
        groupId: 3,
        url: '3',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      url: { [Op.in]: ['1', '2', '3'] }
    }, {});
  }
};
