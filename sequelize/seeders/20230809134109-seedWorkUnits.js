"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("work_units", [
      {
        id: 1,
        code: "0100",
        name: "KS",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:2, 
        code: '0200',
        name: 'WKS 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: '0300',
        name: 'WKS 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("work_units", null, {});
  },
};
