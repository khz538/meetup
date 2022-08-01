'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        firstName: 'Kevin',
        lastName: 'Zhang',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        firstName: 'Hansen',
        lastName: 'Guo',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        firstName: 'Dan',
        lastName: 'Chin',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: "john.smith@gmail.com",
        firstName: 'John',
        lastName: 'Smith',
        username: 'jsmoove',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: "thekingjames@gmail.kom",
        firstName: 'Lebron',
        lastName: 'James',
        username: 'theking23',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2', 'theking23', 'jsmoove'] }
    }, {});
  }
};
