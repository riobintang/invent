const roleServices = require("../../service/mysql/roleServices");

module.exports = {
  handlerGetRoles: async (req, res, next) => {
    try {
      const roles = await roleServices.getRoles();

      res.status(200).json({
        status: "success",
        message: "successfully get Roles",
        data: roles,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetRoleById: async (req, res, next) => {
    try {
      const { id } = req.params;
      const role = await roleServices.getRoleById(id);
      res.status(200).json({
        status: "success",
        message: "successfully get Role",
        data: role,
      });
    } catch (error) {
      next(error);
    }
  },
};
