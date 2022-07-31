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
    previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
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
    previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
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
    previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
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
    previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
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
    previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
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
    previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
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
