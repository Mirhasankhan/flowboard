import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { propertyController } from "./property.controller";
import { propertyValidation } from "./property.validation";
import { fileUploader } from "../../../helpers/fileUploader";
import { parseBodyData } from "../../middlewares/parseBodyData";

const router = express.Router();

router.post(
  "/create",
  auth(UserRole.Admin),
  fileUploader.uploadMultiple,
  parseBodyData,
  validateRequest(propertyValidation.propertyCreateValidationSchema),
  propertyController.createProperty,
);
router.get("/all", propertyController.allProperties);
router.get("/details/:id", propertyController.propertyDetails);
router.put(
  "/update",
  auth(UserRole.Admin),
  fileUploader.uploadMultiple,
  parseBodyData,
  validateRequest(propertyValidation.propertyUpdateValidationSchema),
  propertyController.updateProperty,
);
router.delete("/:id", auth(UserRole.Admin), propertyController.deleteProperty);
router.get("/available-cities", propertyController.availableCities);
router.get("/overview-stats",auth(UserRole.Admin), propertyController.overviewStats);

export const propertyRoutes = router;
