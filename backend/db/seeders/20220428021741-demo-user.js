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
      },
      {
        email: 'Neil@tyson.com',
        username: 'NeilD',
        hashedPassword: bcrypt.hashSync('astrophysicist')
      },
      {
        email: 'Albert@einstein.com',
        username: 'AlbertE',
        hashedPassword: bcrypt.hashSync('relativity')
      },
      {
        email: 'Michio@kaku.com',
        username: 'MichioK',
        hashedPassword: bcrypt.hashSync('stringtheory')
      },
      {
        email: 'Stephen@hawking.com',
        username: 'StephenH',
        hashedPassword: bcrypt.hashSync('blackhole')
      },
      {
        email: 'Brian@cox.com',
        username: 'BrianC',
        hashedPassword: bcrypt.hashSync('particlephysics')
      },
      {
        email: 'May@brian.com',
        username: 'BrianM',
        hashedPassword: bcrypt.hashSync('queen')
      },
      {
        email: 'Chuck@nice.com',
        username: 'ChuckN',
        hashedPassword: bcrypt.hashSync('thisiscoolman')
      },
      {
        email: 'Isaac@newton.com',
        username: 'IsaacN',
        hashedPassword: bcrypt.hashSync('gravity')
      },
      {
        email: 'Johannes@kepler.com',
        username: 'JohannesK',
        hashedPassword: bcrypt.hashSync('planetarymotion')
      },
      {
        email: 'Tycho@brahe.com',
        username: 'TychoB',
        hashedPassword: bcrypt.hashSync('accuracyisthekey')
      },
      {
        email: 'Nicolaus@copernicus',
        username: 'NicolausC',
        hashedPassword: bcrypt.hashSync('heliocentrism')
      },
      {
        email: 'Galileo@galilei.com',
        username: 'GalileoG',
        hashedPassword: bcrypt.hashSync('speedandvelocity')
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
