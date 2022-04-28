'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'shower@shirt.leo',
        username: 'Shower-Shirt',
        hashedPassword: bcrypt.hashSync('password123')
      },
      {
        email: 'JoonxLeo@lovers.com',
        username: 'Joon<3Leo',
        hashedPassword: bcrypt.hashSync('joon4life')
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
