const { roleServices } = require("../../service/mysql/roleServices");

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
};
