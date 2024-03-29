"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("name_items", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        // unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantity : {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      id_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        referense: {
          model: "types",
          key: 'id',
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("name_items");
  },
};
