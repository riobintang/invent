function createModelConditionItem(sequelize, DataTypes) {
  const ConditionItem = sequelize.define("ConditionItem", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  return ConditionItem;
}

module.exports = createModelConditionItem;
