import express  from "express";
import dashboardRegister from "../controlers/admin.controller/dashboardRegister.js";

const adminRoutes = express.Router();

adminRoutes.post('/register', dashboardRegister);

export default adminRoutes;
