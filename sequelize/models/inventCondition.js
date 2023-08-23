function createModelInventCondition(sequelize, DataTypes) {
  const InventCondition = sequelize.define(
    "InventCondition",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_inventory: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "inventories",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      id_condition: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "condition_items",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: "invent_conditions",
    }
  );
  return InventCondition;
}

module.exports = createModelInventCondition;
