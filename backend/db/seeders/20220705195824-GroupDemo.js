'use strict';

const seedGroups = [
  {
    organizerId: 1,
    name: "Kevin's Group",
    about: "A group to test endpoints",
    type: "Online",
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
    type: "In person",
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
    type: "Online",
    private: false,
    city: "Camden",
    state: "NJ",
    numMembers: 23,
    previewImage: 'url4',
  },
  {
    organizerId: 2,
    name: "Group4",
    about: "A group to test endpoints4",
    type: "In-person",
    private: false,
    city: "Hoboken",
    state: "NJ",
    numMembers: 42,
    previewImage: 'url5',
  },
  {
    organizerId: 4,
    name: "Group5",
    about: "A group to test endpoints5",
    type: "In-person",
    private: false,
    city: "Palisades Park",
    state: "NJ",
    numMembers: 16,
    previewImage: 'url6',
  },
  {
    organizerId: 1,
    name: "Online",
    about: "A group to test endpoints6",
    type: "online",
    private: true,
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

