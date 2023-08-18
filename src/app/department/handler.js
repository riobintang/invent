// const departmentServices = require("../../service/mysql/departmentServices");
// const departmentSchema = require("../../validation/departmentSchema");
// const { validation } = require("../../validation/validate");

// module.exports = {
//   handlerGetDepartments: async (req, res, next) => {
//     try {
//       const departments = await departmentServices.getAll();
//       res.status(200).json({
//         status: "success",
//         message: "successfully get all Departments",
//         data: departments,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   handlerGetDepartmentById: async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       console.log(id);
//       const department = await departmentServices.getById(id);
//       res.status(200).json({
//         status: "success",
//         message: "successfully get Department",
//         data: department,
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   handlerAddDepartment: async (req, res, next) => {
//     try {
//       const requestData = validation(departmentSchema, req.body);
//       await departmentServices.addDepartment(requestData.name);
//       res.status(201).json({
//         status: "success",
//         message: "successfully add Department",
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
//   handlerUpdateDepartment: async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const requestData = validation(departmentSchema, req.body);
//       await departmentServices.updateDepartment(id, requestData.name);
//       res.status(200).json({
//         status: "success",
//         message: "successfully update Department",
//       });
//     } catch (error) {
//       next(error);
//     }
//   },
// };
