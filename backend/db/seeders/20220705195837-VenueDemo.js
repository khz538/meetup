'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Venues', [
      {
        address: '123 Fourth St',
        city: 'Chicago',
        state: 'IL',
        latitude: 10.1,
        longitude: 12.4
      },
      {
        address: '123 D St',
        city: 'Baltimore',
        state: 'MD',
        latitude: 10.1,
        longitude: 18.4
      },
      {
        address: '123 Wall St',
        city: 'New York City',
        state: 'NY',
        latitude: 10.1,
        longitude: 20.4
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Venues', {
      state: { [Op.in]: ["IL", "MD", "NY"] }
    }, {});
  }
};
