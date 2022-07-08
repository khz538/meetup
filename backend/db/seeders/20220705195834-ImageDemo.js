'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Images', [
      {
        userId: 3,
        eventId: 1,
        groupId: null,
        imageableType: "Event",
        url: 'url1',
      },
      {
        userId: 1,
        eventId: 2,
        groupId: null,
        imageableType: "Event",
        url: 'url2',
      },
      {
        userId: 2,
        eventId: null,
        groupId: 3,
        imageableType: "Group",
        url: 'url3',
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
