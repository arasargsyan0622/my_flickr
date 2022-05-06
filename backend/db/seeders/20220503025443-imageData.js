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
          imageUrl: 'https://spickr.s3.us-west-1.amazonaws.com/1651549488959.jpg',
          userId: 2,
        },
        {
          title: 'Kepler-22b',
          imageUrl: "https://spickr.s3.us-west-1.amazonaws.com/1651549594588.png",
          userId: 1,
        },
        {
          title: 'Kepler-22b',
          imageUrl: "https://spickr.s3.us-west-1.amazonaws.com/1651550138609.jpg",
          userId: 1,
        },
        {
          title: 'Aurora',
          imageUrl: "https://spickr.s3.us-west-1.amazonaws.com/1651549488959.jpg",
          userId: 2,
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
