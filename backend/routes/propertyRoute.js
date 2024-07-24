import express from "express";
import propertyController from "../controller/propertyController.js";
import middlewares from "../utils/middleware.js";
const router = express.Router();

router.post("/create", propertyController.createProperty);

router.delete(
    "/delete/:id",
    middlewares.isAuthorized,
    propertyController.deleteProperty
);

router.get("/getAll", propertyController.getAllProperty);

router.post("/addLead/:id/:leadId", propertyController.addLead);

export default router;
