import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { columnController } from "./column.controller";
import { columnValidation } from "./column.validation";
import rateLimiter from "../../middlewares/rateLimiter";

const router = express.Router();

router.post(
  "/create",
  auth(),
  rateLimiter(1, 5),
  validateRequest(columnValidation.columnSchema),
  columnController.createNewColumn,
);

router.put(
  "/update",
  auth(),
  rateLimiter(1, 3),
  validateRequest(columnValidation.columnUpdateSchema),
  columnController.updateColumnTitle,
);
router.put(
  "/reorder",
  auth(),
  rateLimiter(1, 7),
  validateRequest(columnValidation.columnReorderSchema),
  columnController.reorderColumn,
);

router.delete(
  "/delete/:columnId",
  auth(),
  rateLimiter(1, 3),
  columnController.deleteColumn,
);

export const columnRoutes = router;
