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
          imageId: 3,
        },
        {
          comment: "I'd love to see it irl",
          userId: 2,
          imageId: 3,
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
