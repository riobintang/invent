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
    await queryInterface.bulkInsert("name_items", [
      {
        id: 1,
        code: "001",
        name: "Meja",
        id_type: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        code: "002",
        name: "Kursi",
        id_type: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        code: "003",
        name: "Almari Kayu",
        id_type: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        code: "004",
        name: "Almari Plastik",
        id_type: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        code: "005",
        name: "Rak Peralatan",
        id_type: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        code: "006",
        name: "Dispenser, Lemari Es/Kulkas",
        id_type: "3",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        code: "007",
        name: "Kipas Angin",
        id_type: "3",
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
    await queryInterface.bulkDelete("name_items", null, {});
  },
};
