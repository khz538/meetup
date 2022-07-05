'use strict';

const seedGroups = [
  {
    organizerId: 1,
    name: "Kevin's Group",
    about: "A group to test endpoints",
    type: "online",
    private: true,
    city: "Chicago",
    state: "IL",
    numMembers: 1,
    previewImage: 'url',
  },
  {
    organizerId: 2,
    name: "Hansen's Group",
    about: "A group to test endpoints",
    type: "in-person",
    private: true,
    city: "Baltimore",
    state: "MD",
    numMembers: 5,
    previewImage: 'url',
  },
  {
    organizerId: 3,
    name: "Dan's Group",
    about: "A group to test endpoints",
    type: "online",
    private: false,
    city: "Jersey City",
    state: "NJ",
    numMembers: 10,
    previewImage: 'url',
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Groups', seedGroups, {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Groups', {
      name: { [Op.in]: ["Kevin's Group", "Hansen's Group", "Dan's Group"] }
    }, {});
  }
};

