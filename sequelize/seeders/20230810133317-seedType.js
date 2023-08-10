'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('types', [
      {
        code: '220',
        name: 'Mebeler',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: '230',
        name: 'Almari',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: '240',
        name: 'Elektronik',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('types', null, {})
  }
};
