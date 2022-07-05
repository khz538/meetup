'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GroupMembers', [
      {
        userId: 1,
        groupId: 1,
        membershipStatus: "member"
      },
      {
        userId: 2,
        groupId: 2,
        membershipStatus: "pending"
      },
      {
        userId: 3,
        groupId: 3,
        membershipStatus: "waitlist"
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('GroupMembers', {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
