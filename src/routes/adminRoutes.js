import express from "express";
import dashboardLogin from "../controlers/admin.controller/dashboardLogin.js";
import dashboardRegister from "../controlers/admin.controller/dashboardRegister.js";

const adminRoutes = express.Router();

adminRoutes.post("/register", dashboardRegister);
adminRoutes.post("/login", dashboardLogin);

export default adminRoutes;
