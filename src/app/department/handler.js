const {
  departmentServices,
} = require("../../service/mysql/departmentServices");

module.exports = {
  handlerGetDepartments: async (req, res, next) => {
    try {
      const departments = await departmentServices.getAll();
      res.status(200).json({
        status: 'success',
        message: 'successfully get all Departments',
        data: departments,
      });
    } catch (error) {
      next(error);
    }
  },
  handlerGetDepartmentById: async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id)
        const department = await departmentServices.getById(id);
        res.status(200).json({
            status: 'success',
            message: 'successfully get Department',
            data: department,
        })
    } catch (error) {
      next(error);
    }
  },
};
