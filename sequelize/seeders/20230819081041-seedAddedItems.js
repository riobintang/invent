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
    await queryInterface.bulkInsert('added_items', [
      {
        id: 1,
        quantity: 10,
        added_date: new Date("2023-03-25"),
        id_name_item: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        quantity: 10,
        added_date: new Date("2023-03-25"),
        id_name_item: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        quantity: 10,
        added_date: new Date("2023-03-25"),
        id_name_item: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("added_items", null, {});
  },
};
