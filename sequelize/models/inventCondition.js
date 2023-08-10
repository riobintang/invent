function createModelInventCondition(sequelize, DataTypes) {
  const InventCondition = sequelize.define("InventCondition", {
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
        model: "conditionItems",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  return InventCondition;
}

module.exports = createModelInventCondition;
