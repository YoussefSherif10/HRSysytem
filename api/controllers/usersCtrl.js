const mongoose = require("mongoose");
const Employee = mongoose.model("Employee");
const jwt = require("jsonwebtoken");
const utils = require("../utils/utils");

const login = async (req, res) => {
  try {
    const { email } = await utils.getRequestData(req);

    if (!email) {
      utils.failedResponse(res, "Email is required");
      return;
    }

    const employee = await Employee.findOne({ email }).exec();

    if (!employee) {
      utils.failedResponse(res, "Employee not found");
      return;
    }

    if (employee.group !== "HR") {
      utils.failedResponse(res, "You are not in the HR group");
      return;
    }

    const token = jwt.sign(
      {
        email: employee.email,
      },
      "ThisIsSecret",
      { expiresIn: "1d" }
    );

    utils.successResponse(res, JSON.stringify({ token }));
  } catch (error) {
    utils.failedResponse(res, "Internal server error");
  }
};

module.exports = { login };
