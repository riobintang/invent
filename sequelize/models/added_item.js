const { Sequelize } = require(".");

function createModelAddedItem(sequelize, DataTypes) {
  const Added_item = sequelize.define("Added_item", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    specification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    id_name_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'nameItems',
        key: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_work_unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
      referense: {
        model: 'work_units',
        key: 'id',
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  });

  return Added_item;
}

module.exports = createModelAddedItem;
