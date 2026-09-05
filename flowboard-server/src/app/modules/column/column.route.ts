import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { columnController } from "./column.controller";
import { columnValidation } from "./column.validation";

const router = express.Router();

router.post(
  "/create",
  auth(),
  validateRequest(columnValidation.columnSchema),
  columnController.createNewColumn,
);

router.put(
  "/update",
  auth(),
  validateRequest(columnValidation.columnUpdateSchema),
  columnController.updateColumnTitle,
);
router.put(
  "/reorder",
  auth(),
  validateRequest(columnValidation.columnReorderSchema),
  columnController.reorderColumn,
);

router.delete(
  "/delete/:columnId",
  auth(),
  columnController.deleteColumn,
);

export const columnRoutes = router;
