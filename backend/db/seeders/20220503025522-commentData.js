'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
    */
      return queryInterface.bulkInsert('Comments', [
        {
          comment: "Abosuletely mindblowing",
          userId: 1,
          imageId: 1,
        },
        {
          comment: "That looks great",
          userId: 1,
          imageId: 4,
        },
        {
          comment: "I'd love to see it irl",
          userId: 2,
          imageId: 4,
        },
        {
          comment: "test test",
          userId: 1,
          imageId: 4,
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
      Example:
    */
      return queryInterface.bulkDelete('Comments', null, {});
  }
};
