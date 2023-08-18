function createModelInventory(sequelize, DataTypes) {
  const Inventory = sequelize.define(
    "Inventory",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      codeInvent: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_added_item: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "added_items",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_work_unit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "work_units",
          key: "id",
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
    },
    {
      tableName: "inventories",
    }
  );

  return Inventory;
}

module.exports = createModelInventory;
