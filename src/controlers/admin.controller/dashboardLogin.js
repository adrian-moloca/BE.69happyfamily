import Admin from "../../models/admin.model.js";
import bcrypt from "bcrypt";
import validateProperty from '../../utils/validators/validateProperty.js';

const dashboardLogin = async (req, res, _next) => {
  const { userName, password } = req.body;
  try {
    if (!validateProperty(userName) || !validateProperty(userName)) {
      return res.status(400).json({
        error: "Username and Password required",
      });
    }

    if (typeof userName !== "string" || typeof password !== "string") {
      return res.status(400).json({
        error: "Username and Password must be of string type",
      });
    }

    const admin = await Admin.findOne({ userName: userName });

    if (!admin) {
      return res.status(404).json({
        error: "User does not exist",
      });
    }

    const validPassword = await bcrypt.compare(password, admin.password);
    if (!validPassword) {
      return res.status(400).json({
        error: "Invalid password.",
      });
    }

    admin.loggedIn = true;

    return res.status(200).json({
      message: "Successfully logged in",
      adminUser: admin,
    });
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

export default dashboardLogin;
