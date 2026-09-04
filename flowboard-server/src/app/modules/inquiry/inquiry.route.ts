import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { inquiryValidation } from "./inquiry.validation";
import { inquiryController } from "./inquiry.controller";
import rateLimiter from "../../middlewares/rateLimiter";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/create",
  rateLimiter(1, 2),
  validateRequest(inquiryValidation.inquiryCreateValidationSchema),
  inquiryController.createInquiry,
);
router.get("/all", auth(UserRole.Admin), inquiryController.allInquiries);
router.delete(
  "/:id",
  auth(UserRole.Admin),
  inquiryController.deleteInquiry,
);

export const inquiryRoutes = router;
