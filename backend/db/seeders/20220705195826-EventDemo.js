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
        previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
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
        previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
      },
      {
        groupId: 3,
        venueId: 3,
        name: "Dan's Event",
        description: "party!",
        type: "Online",
        capacity: 34,
        price: 10.50,
        startDate: new Date('2022-08-16'),
        endDate: new Date('2022-08-17'),
        numAttending: 13,
        previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
      },
      {
        groupId: 4,
        venueId: 4,
        name: "4444444",
        description: "party!",
        type: "Online",
        capacity: 37,
        price: 35.60,
        startDate: new Date('2022-08-16'),
        endDate: new Date('2022-08-17'),
        numAttending: 22,
        previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
      },
      {
        groupId: 3,
        venueId: 5,
        name: "5555555",
        description: "party!",
        type: "In person",
        capacity: 57,
        price: 346.22,
        startDate: new Date('2022-08-16'),
        endDate: new Date('2022-08-17'),
        numAttending: 23,
        previewImage: 'https://media.istockphoto.com/photos/dramatic-sunset-downtown-chicago-picture-id1204331594?k=20&m=1204331594&s=612x612&w=0&h=A3jtAUu-SlWPtYiaytmeI7nuU-k_OIDpIWfyeiTk47Y=',
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
