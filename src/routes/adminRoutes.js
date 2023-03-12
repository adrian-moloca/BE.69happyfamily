import express from "express";
import dashboardLogin from "../controlers/admin.controller/dashboardLogin.js";
import dashboardRegister from "../controlers/admin.controller/dashboardRegister.js";
import deleteAdmin from "../controlers/admin.controller/deleteAdmin.js";
import getAdmin from "../controlers/admin.controller/getAdmin.js";
import updateAdmin from "../controlers/admin.controller/updateAdmin.js";

const adminRoutes = express.Router();

adminRoutes.post("/register", dashboardRegister);
adminRoutes.post("/login", dashboardLogin);
adminRoutes.delete("/:adminId/delete", deleteAdmin);
adminRoutes.get("/get", getAdmin);
adminRoutes.patch("/:adminId/update", updateAdmin);

export default adminRoutes;
