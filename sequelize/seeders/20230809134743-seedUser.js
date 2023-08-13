'use strict';
const { v4: uuidv4 } = require('uuid');

const bcrypt = require('bcrypt');
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
   await queryInterface.bulkInsert('users', [
    {
      id: 1,
      uuid: uuidv4(),
      username: "adminJurusan",
      password: await bcrypt.hash('12345678', 10),
      id_role: 1,
      id_department: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
   ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('users', null, {});
  }
};
