"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// User and Role
sequelize.models.Role.hasMany(sequelize.models.User, {
  foreignKey: "id_role",
  sourceKey: "id",
});
sequelize.models.User.belongsTo(sequelize.models.Role, {
  foreignKey: "id_role",
  targetKey: "id",
});

// User and Work Unit
sequelize.models.Work_unit.hasMany(sequelize.models.User, {
  foreignKey: "id_work_unit",
  targetKey: "id",
});
sequelize.models.User.belongsTo(sequelize.models.Work_unit, {
  foreignKey: "id_work_unit",
  sourceKey: "id",
});

// NameItem and Type
sequelize.models.NameItem.belongsTo(sequelize.models.Type, {
  foreignKey: "id_type",
  sourceKey: "id",
});
sequelize.models.Type.hasMany(sequelize.models.NameItem, {
  foreignKey: "id_type",
  targetKey: "id",
});

// Added_item and NameItem
sequelize.models.Added_item.belongsTo(sequelize.models.NameItem, {
  foreignKey: "id_name_item",
  sourceKey: "id",
});
sequelize.models.NameItem.hasMany(sequelize.models.Added_item, {
  foreignKey: "id_name_item",
  targetKey: "id",
});

// Inventory and NameItem
sequelize.models.Inventory.belongsTo(sequelize.models.NameItem, {
  foreignKey: "id_name_item",
  sourceKey: "id",
});

sequelize.models.NameItem.hasMany(sequelize.models.Inventory, {
  foreignKey: "id_name_item",
  targetKey: "id",
});

// Inventory and Work Unit
sequelize.models.Inventory.belongsTo(sequelize.models.Work_unit, {
  foreignKey: "id_work_unit",
  sourceKey: "id",
});
sequelize.models.Work_unit.hasMany(sequelize.models.Inventory, {
  foreignKey: "id_work_unit",
  targetKey: "id",
});

// InventCondition and Inventory
sequelize.models.InventCondition.belongsTo(sequelize.models.Inventory, {
  foreignKey: "id_inventory",
  sourceKey: "id",
});
sequelize.models.Inventory.hasMany(sequelize.models.InventCondition, {
  foreignKey: "id_inventory",
  targetKey: "id",
});

sequelize.models.Inventory.belongsTo(sequelize.models.ConditionItem, {
  foreignKey: "status",
  targetKey: "id",
});

sequelize.models.ConditionItem.hasMany(sequelize.models.Inventory, {
  foreignKey: "status",
  sourceKey: "id",
});

// InventCondition and Condition
sequelize.models.InventCondition.belongsTo(sequelize.models.ConditionItem, {
  foreignKey: "id_condition",
  sourceKey: "id",
});
sequelize.models.ConditionItem.hasMany(sequelize.models.InventCondition, {
  foreignKey: "id_condition",
  targetKey: "id",
});




db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
