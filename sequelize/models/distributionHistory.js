function createModelDistributionHistory(sequelize, DataTypes) {
  const DistributionHistory = sequelize.define(
    "DistributionHistory",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
      qty: {
        type: DataTypes.INTEGER,
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
    },
    {
      tableName: "distributionhistories",
    }
  );
  return DistributionHistory;
}


module.exports = createModelDistributionHistory;
