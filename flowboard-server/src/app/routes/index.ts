import express from "express";
import { userRoutes } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.routes";
import { inquiryRoutes } from "../modules/inquiry/inquiry.route";
import { propertyRoutes } from "../modules/property/property.route";

const router = express.Router();

const moduleRoutes = [
  { path: "/users", route: userRoutes },
  { path: "/auth", route: authRoute },
  { path: "/inquiry", route: inquiryRoutes },
  { path: "/property", route: propertyRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
