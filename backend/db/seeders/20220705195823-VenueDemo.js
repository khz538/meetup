// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert('Venues', [
      // {
      //   address: '123 Fourth St',
      //   city: 'Chicago',
      //   state: 'IL',
      //   latitude: 10.1,
      //   longitude: 12.4
      // },
      // {
      //   address: '123 D St',
      //   city: 'Baltimore',
      //   state: 'MD',
      //   latitude: 10.1,
      //   longitude: 18.4
      // },
      // {
      //   address: '123 Wall St',
      //   city: 'New York City',
      //   state: 'NY',
      //   latitude: 10.1,
      //   longitude: 20.4
      // },
//     ], {});
//   },

//   down: async (queryInterface, Sequelize) => {
//     const Op = Sequelize.Op;
//     return queryInterface.bulkDelete('Venues', {
//       state: { [Op.in]: ["IL", "MD", "NY"] }
//     }, {});
//   }
// };

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Venues', [
    {
      groupId: 2,
      address: 'AAA',
      city: 'Baltimore',
      state: 'MD',
      lat: 18.783212,
      lng: 60.82393,
    },
    {
      groupId: 1,
      address: 'BBB',
      city: 'New York',
      state: 'NY',
      lat: 19.783212,
      lng: 67.82393,
    },
    {
      groupId: 3,
      address: 'CCC',
      city: 'Chicago',
      state: 'IL',
      lat: 16.783212,
      lng: 50.82393,
    },
    {
      groupId: 4,
      address: '123 Fourth St',
      city: 'Chicago',
      state: 'IL',
      lat: 10.1,
      lng: 12.4
    },
    {
      groupId: 5,
      address: '123 D St',
      city: 'Baltimore',
      state: 'MD',
      lat: 10.1,
      lng: 18.4
    },
    {
      groupId: 6,
      address: '123 Wall St',
      city: 'New York City',
      state: 'NY',
      lat: 10.1,
      lng: 20.4
    },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Venues', {
      city: { [Op.in]: ['Baltimore', 'New York', 'Chicago'] }
    }, {});
  }
};