function createModelAddedItem(sequelize, DataTypes) {
  const Added_item = sequelize.define(
    "Added_item",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      added_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        get: function () {
          return this.getDataValue("added_date").split("-").reverse().join("-");
        },
        set(value) {
          return this.setDataValue(
            "added_date",
            value.split("-").reverse().join("-")
          );
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
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
      tableName: "added_items",
    }
  );

  return Added_item;
}

module.exports = createModelAddedItem;
