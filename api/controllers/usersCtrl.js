const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const utils = require("../utils/utils");

const login = async (req, res) => {
  try {
    const { email, password } = await utils.getRequestData(req);

    if (!email || !password) {
      utils.failedResponse(res, "All fields are required");
      return;
    }

    const user = await User.findOne({ email }).exec();

    if (!user) {
      utils.failedResponse(res, "User not found");
      return;
    }

    const token = jwt.sign(
      {
        email: user.email,
      },
      "ThisIsSecret",
      { expiresIn: "1d" }
    );

    utils.successResponse(res, token);
  } catch (error) {
    utils.failedResponse(res, "Internal server error");
  }
};

const signup = async (req, res) => {
  try {
    const { email, password } = await utils.getRequestData(req);

    if (!email || !password) {
      utils.failedResponse(res, "All fields are required");
      return;
    }

    const existingUser = await User.findOne({ email }).exec();

    if (existingUser) {
      utils.failedResponse(res, "User already exists");
      return;
    }

    const newUser = new User({
      email,
      password,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        email: newUser.email,
      },
      "ThisIsSecret",
      { expiresIn: "1d" }
    );

    utils.successResponse(res, token);
  } catch (error) {
    utils.failedResponse(res, "Internal server error");
  }
};

module.exports = { login, signup };
