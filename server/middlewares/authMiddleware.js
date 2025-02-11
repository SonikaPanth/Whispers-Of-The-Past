const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel.js");

const requireSignIn = async (req, res, next) => {
  try {
    const decoded = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({ success: false, message: "Unauthorized Access" });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user || user.role !== 1) {
      return res.status(403).send({ success: false, message: "Forbidden: Admin Access Required" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Error in admin middleware", error });
  }
};

module.exports = { requireSignIn, isAdmin };
