import express from "express";
import propertyController from "../controller/propertyController.js";
const router = express.Router();

router.post("/create", propertyController.createProperty);

router.delete("/delete/:id", propertyController.deleteProperty);

router.get("/getAll", propertyController.getAllProperty);

export default router;
