// 'use strict';

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert('Venues', [
//       {
//         address: '123 Fourth St',
//         city: 'Chicago',
//         state: 'IL',
//         latitude: 10.1,
//         longitude: 12.4
//       },
//       {
//         address: '123 D St',
//         city: 'Baltimore',
//         state: 'MD',
//         latitude: 10.1,
//         longitude: 18.4
//       },
//       {
//         address: '123 Wall St',
//         city: 'New York City',
//         state: 'NY',
//         latitude: 10.1,
//         longitude: 20.4
//       },
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
      address: 'AAA',
      city: 'Baltimore',
      state: 'MD',
      latitude: 18.783212,
      longitude: 60.82393,
    },
    {
      address: 'BBB',
      city: 'New York',
      state: 'NY',
      latitude: 19.783212,
      longitude: 67.82393,
    },
    {
      address: 'CCC',
      city: 'Chicago',
      state: 'IL',
      latitude: 16.783212,
      longitude: 50.82393,
    }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Venues', {
      city: { [Op.in]: ['Baltimore', 'New York', 'Chicago'] }
    }, {});
  }
};