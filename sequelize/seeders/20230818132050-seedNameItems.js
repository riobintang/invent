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
    await queryInterface.bulkInsert("nameItems", [
      {
        code: "001",
        name: "Meja",
        id_type: 1,
      },
      {
        code: "002",
        name: "Kursi",
        id_type: 1,
      },
      {
        code: "003",
        name: "Almari Kayu",
        id_type: "2",
      },
      {
        code: "004",
        name: "Almari Plastik",
        id_type: "2",
      },
      {
        code: "005",
        name: "Rak Peralatan",
        id_type: "2",
      },
      {
        code: "006",
        name: "Dispenser, Lemari Es/Kulkas",
        id_type: "3",
      },
      {
        code: "007",
        name: "Kipas Angin",
        id_type: "3",
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
    await queryInterface.bulkDelete('nameItems', null, {});
  },
};
