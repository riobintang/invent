function createModelInventory(sequelize, DataTypes) {
  const Inventory = sequelize.define("Inventory", {
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
    specification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
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
    id_name_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "nameItems",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    id_department: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "departments",
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
    id_type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "types",
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
  });

  return Inventory;
}

module.exports = createModelInventory;
