import Admin from "../../models/admin.model.js";
import validateBodyRequest from "../../utils/validateBodyRequest.js";

const dashboardRegister = async (req, res, _next) => {
  const { isUndefined, message } = validateBodyRequest(req.body);
  const { userName, password, firstName, lastName, email, age } = req.body;
  try {
    const adminEmailsEnv = process.env.ADMIN_EMAILS;

    if (isUndefined === true) {
      return res.status(400).json({ message: message });
    }

    if (
      typeof userName !== "string" ||
      typeof password !== "string" ||
      typeof age !== "number" ||
      typeof firstName !== "string" ||
      typeof lastName !== "string" ||
      typeof email !== "string"
    ) {
      return res.status(400).json({
        error: "Invalid type",
      });
    }

    if (!adminEmailsEnv.includes(email)) {
      return res.status(400).json({
        error: "You can't create an account with this email",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters",
      });
    }

    if (userName.length < 3) {
      return res.status(400).json({
        error: "Username must be at least 3 characters",
      });
    }

    if (age < 18) {
      return res.status(400).json({
        error: "Too young to use our platform",
      });
    }

    const adminEmailExists = await Admin.findOne({ email: email });

    if (adminEmailExists) {
      return res.status(409).json({
        error: "Conflict. Admin user with this email already exists",
      });
    }

    const adminExists = await Admin.findOne({ userName: userName });

    if (adminExists) {
      return res.status(409).json({
        error: "Admin user already exists",
      });
    }

    const newAdminUser = new Admin({
      userName,
      password,
      age,
      email,
      firstName,
      lastName,
    });

    await newAdminUser
      .save()
      .then((adminUser) => {
        adminUser.loggedIn = true;
        return res.status(201).json({
          message: "Admin User Created!",
          adminUser,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Save error",
          error: err,
        });
      });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error,
    });
  }
};

export default dashboardRegister;
