import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import UsersController from "../controllers/users.controller";
import AppController from "../controllers/app.controller";
import AuthorizationMiddleware from "../security/authorization.middleware";
import LoggerController from "../controllers/logger.controller";
import rolesController from "../controllers/roles.controller";
import sourcesController from "../controllers/sources.controller";

const router = Router();

router.get("/", AppController.welcome);

// Auth
router.post("/api/auth/login", AuthController.login);
router.post("/api/auth/register", AuthController.signUp);

// Logs
router.get("/api/logs/login", LoggerController.loginLogs);

// Users
router.get("/api/users", UsersController.getAll);
router.get("/api/users/id/:id", UsersController.getUserById);
router.get("/api/logs", AuthorizationMiddleware.adminOnly, UsersController.getUserById);
router.get("/api/users/email/:email", UsersController.getUserByEmail);
router.delete(
  "/api/users/:id/delete",
  AuthorizationMiddleware.adminOnly,
  UsersController.deletetUserById
);
router.patch(
  "/api/users/:id/deactivate",
  AuthorizationMiddleware.adminOnly,
  UsersController.deactivateUserById
);
router.patch(
  "/api/users/roles/:id/user",
  AuthorizationMiddleware.adminOnly,
  rolesController.makeUserById
);
router.patch(
  "/api/users/roles/:id/admin",
  AuthorizationMiddleware.adminOnly,
  rolesController.makeAdminById
);
router.post("/api/sources/path/set", AuthorizationMiddleware.adminOnly, sourcesController.setPath);
router.get("/api/sources/path/get", sourcesController.getPath);
router.get(
  "/api/sources/path/history",
  AuthorizationMiddleware.adminOnly,
  sourcesController.getPathHistory
);

export default router;
