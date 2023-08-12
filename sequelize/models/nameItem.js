function createModelNameItem(sequelize, DataTypes) {
  const NameItem = sequelize.define(
    "NameItem",
    {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        referense: {
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
    },
    {
      tableName: "nameItems",
    }
  );

  return NameItem;
}

module.exports = createModelNameItem;
