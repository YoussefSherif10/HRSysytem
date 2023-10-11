const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");
const utils = require("../utils/utils");

async function getEmployees(req, res) {
  try {
    const employees = await Employee.find();
    utils.successResponse(res, JSON.stringify(employees));
  } catch (error) {
    utils.failedResponse(res, "Error retrieving employees");
  }
}

async function createEmployee(req, res) {
  try {
    const newEmployee = await utils.getRequestData(req);
    const employee = new Employee(newEmployee);
    const savedEmployee = await employee.save();
    utils.successResponse(res, JSON.stringify(savedEmployee));
  } catch (error) {
    utils.failedResponse(res, "Error creating employee");
  }
}

async function updateEmployee(req, res) {
  const id = utils.getID(req);
  try {
    const newData = await utils.getRequestData(req);
    const employee = await Employee.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (employee) {
      utils.successResponse(res, JSON.stringify(employee));
    } else {
      utils.failedResponse(res, "Employee not found");
    }
  } catch (error) {
    utils.failedResponse(res, "Error updating employee");
  }
}

async function deleteEmployee(req, res) {
  const id = utils.getID(req);
  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (employee) {
      utils.successResponse(res, JSON.stringify(employee));
    } else {
      utils.failedResponse(res, "Employee not found");
    }
  } catch (error) {
    utils.failedResponse(res, "Error deleting employee");
  }
}

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
