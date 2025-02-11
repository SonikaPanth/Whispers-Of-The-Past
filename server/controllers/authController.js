const userModel = require("../models/userModel.js");
const { comparePassword, hashPassword } = require("../helpers/authHelper.js");
const JWT = require("jsonwebtoken");

// REGISTER CONTROLLER
const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validations
    if (!name) return res.send({ error: "Name is Required" });
    if (!email) return res.send({ error: "Email is Required" });
    if (!password) return res.send({ error: "Password is Required" });
    if (!phone) return res.send({ error: "Phone no is Required" });
    if (!address) return res.send({ error: "Address is Required" });

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already Registered, please login",
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Save new user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

// LOGIN CONTROLLER
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Email and Password are required",
      });
    }

    // Check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // Check password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid Password",
      });
    }

    // Generate Token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address, // Fixed typo ("adddress" → "address")
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// TEST CONTROLLER
const testController = (req, res) => {
  try {
    res.send("Protected Route");
  } catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
};

// Export controllers
module.exports = {
  registerController,
  loginController,
  testController,
};
