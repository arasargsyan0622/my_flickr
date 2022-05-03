'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
    */
      return queryInterface.bulkInsert('Images', [
        {
          title: 'Kepler-22b',
          imageUrl: '1068e845d682d222bed078026bf87025',
          userId: 2,
        },
        {
          title: 'Kepler-22b',
          imageUrl: "1068e845d682d222bed078026bf87025",
          userId: 1,
        },
        {
          title: 'Kepler-22b',
          imageUrl: "1068e845d682d222bed078026bf87025",
          userId: 1,
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
    */
      return queryInterface.bulkDelete('Images', null, {});
  }
};