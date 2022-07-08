'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      {
        groupId: 1,
        venueId: 1,
        name: "Kevin's Event",
        description: "birthday party!",
        type: "In person",
        capacity: 50,
        price: 0,
        startDate: new Date('2022-08-16'),
        endDate: new Date('2022-08-17'),
        numAttending: 20,
        previewImage: 'partyUrl',
      },
      {
        groupId: 2,
        venueId: 2,
        name: "Hansen's Event",
        description: "graduation party!",
        type: "In person",
        capacity: 50,
        price: 5.00,
        startDate: new Date('2022-08-16'),
        endDate: new Date('2022-08-17'),
        numAttending: 35,
        previewImage: 'gradUrl',
      },
      {
        groupId: 3,
        venueId: 3,
        name: "Dan's Event",
        description: "party!",
        type: "Online",
        capacity: 100,
        price: 10.50,
        startDate: new Date('2022-08-16'),
        endDate: new Date('2022-08-17'),
        numAttending: 99,
        previewImage: 'url',
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Events', {
      name: { [Op.in]: ["Kevin's Event", "Hansen's Event", "Dan's Event"] }
    }, {});
  }
};
