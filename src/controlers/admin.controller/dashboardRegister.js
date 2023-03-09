import Admin from "../../models/admin.model.js";
import validateBodyRequest from "../../utils/validateBodyRequest.js";
import bcrypt from "bcrypt";

const dashboardRegister = async (req, res, _next) => {
  const { isUndefined, message } = validateBodyRequest(req.body);
  const { userName, password, firstName, lastName, email, age } = req.body;
  try {
    const adminEmailsEnv = process.env.ADMIN_EMAILS;

    if (isUndefined === true) {
      return res.status(400).json({ message: message });
    }

    if (
      !verifyDataType(userName, 'string') ||
      !verifyDataType(password, 'string') ||
      !verifyDataType(age, 'number') ||
      !verifyDataType(firstName, 'string') ||
      !verifyDataType(lastName, 'string') ||
      !verifyDataType(email, 'string')
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

    let encryptedPassword;
    bcrypt.genSalt(10, (salt, err) => {
      if (err) {
        console.log(err);
      }
      bcrypt.hash(password, salt, (error, hash) => {
        if (error) {
          console.log(error);
        }
        encryptedPassword = hash;
      });
    });

    const adminEmailExists = await Admin.findOne({ email: email });

    if (adminEmailExists) {
      return res.status(409).json({
        error: "Conflict. Admin user with this email already exists",
      });
    }

    const userNameExists = await Admin.findOne({ userName: userName });

    if (userNameExists) {
      return res.status(409).json({
        error: "Admin user already exists",
      });
    }

    const newAdminUser = new Admin({
      userName,
      password: encryptedPassword,
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
