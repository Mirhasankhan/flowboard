import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.routes";
import { boardRoutes } from "../modules/board/board.route";
import { columnRoutes } from "../modules/column/column.route";
import { taskRoutes } from "../modules/task/task.route";


const router = express.Router();

const moduleRoutes = [
  { path: "/user", route: userRoutes },
  { path: "/auth", route: authRoute },
  { path: "/board", route: boardRoutes },
  { path: "/column", route: columnRoutes },
  { path: "/task", route: taskRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
