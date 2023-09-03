const { ConditionItem } = require("../../../sequelize/models");
const ResponseError = require("../../util/responseError");

module.exports = {
  getAll: async () => {
    return await ConditionItem.findAll();
  },
  getById: async (id) => {
    const condition = await ConditionItem.findByPk(id);

    if (!condition) {
      throw new ResponseError(400, "Condition not found");
    }

    return condition;
  },
};
