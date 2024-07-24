import express from "express";
import authController from "../controller/authController.js";
const router = express.Router();

router.post("/register", authController.createAdmin);

router.post("/login", authController.validateAdmin);

router.post("/saveUsers", authController.saveUsers);

router.get("/admin/validateToken", authController.validateToken);

export default router;
