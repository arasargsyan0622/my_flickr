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
          title: 'Arp 299',
          content: 'Galactic Goulash: One definition for goulash, according to the Merriam-Webster dictionary, is mixture of heterogeneous elements, jumble. This 2017 image of Arp 299 is just that.',
          imageUrl: 'https://spickr.s3.us-west-1.amazonaws.com/1651549488959.jpg',
          userId: 1,
        },
        {
          title: 'Black Hole',
          content: 'The black hole is a gravitational singularity in the universe. It is a region of spacetime exhibiting gravitational effects that are strong enough to cause strong interaction between particles.',
          imageUrl: "https://spickr.s3.us-west-1.amazonaws.com/1651549594588.png",
          userId: 2,
        },
        {
          title: 'The Lagoon Nebula Gives Birth to Stars',
          content: 'The Lagoon Nebula is a supernova remnant that is located in the center of the Milky Way galaxy.',
          imageUrl: "https://spickr.s3.us-west-1.amazonaws.com/1651550138609.jpg",
          userId: 3,
        },
        {
          title: 'Our Sun as a Glowing Pumpkin',
          content: 'The Sun is a star, a hot ball of gas, that is a central part of the Solar System.',
          imageUrl: "https://spickr.s3.us-west-1.amazonaws.com/1651549957975.jpeg",
          userId: 4,
        },
        {
          title: 'Aurora Australis Lights Up the Sky',
          content: 'This image, taken from aboard the International Space Station, shows the aurora australis as it streams across the Earth atmosphere.',
          imageUrl: "https://spickr.s3.us-west-1.amazonaws.com/1651610268549.jpg",
          userId: 5,
        },
        {
          title: 'Black hole collision',
          imageUrl: "https://spickr.s3.us-west-1.amazonaws.com/1651966001922.jpg",
          userId: 6,
        },
        {
          title: 'Hubble Spies Newly Forming Star Incubating in IC 2631',
          content: 'The newly formed star is a red dwarf, a type of star that is cooler than the Sun.',
          imageUrl: "https://spickr.s3.us-west-1.amazonaws.com/1651879926992.jpg",
          userId: 7,
        },
        {
          title: 'Laser Communications Relay Demonstration Lifts Off!',
          content: 'The laser communications relay demonstration is a satellite that is launched into orbit by the United States Space Force.',
          imageUrl: "https://spickr.s3.us-west-1.amazonaws.com/1651879651595.jpeg",
          userId: 8,
        },
        {
          title: 'A Jupiter-Like Rogue Planet Wanders Alone in Space',
          content: 'A rogue planet is an interstellar object of planetary-mass, therefore smaller than fusors (stars and brown dwarfs) and without a host planetary system.',
          imageUrl: "https://spickr.s3.us-west-1.amazonaws.com/1651879546611.jpg",
          userId: 9,
        },
        {
          title: 'Hubble Shows Us the Future',
          content: 'The Hubble telescope is a space telescope designed to study the universe.',
          imageUrl: "https://spickr.s3.us-west-1.amazonaws.com/1651879469676.jpg",
          userId: 10,
        },

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
