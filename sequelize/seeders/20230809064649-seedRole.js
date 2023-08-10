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

    await queryInterface.bulkInsert('roles', [{
      id: 1,
      name: "admin utama",
      value: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    {
      id: 2,
      name: "admin jurusan",
      value: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.bulkDelete('roles', null, {});
     
  }
};
