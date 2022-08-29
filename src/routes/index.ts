import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import UsersController from '../controllers/users.controller';
import AppController from '../controllers/app.controller';
import AuthorizationMiddleware from '../security/authorization.middleware';
import LoggerController from '../controllers/logger.controller';
import RolesController from '../controllers/roles.controller';
import SourcesController from "../controllers/sources.controller";

const router = Router();

// Root
router.get("/", AppController.welcome);

// Auth
router.post("/api/auth/login", AuthController.login);
router.post("/api/auth/register", AuthController.signUp);

// Logs
router.get("/api/logs/login", LoggerController.loginLogs);

// Users
router.get('/api/users', UsersController.getAll);
router.get('/api/users/id/:id', UsersController.getUserById);
router.get('/api/users/email/:email', UsersController.getUserByEmail);
router.get('/api/logs', AuthorizationMiddleware.adminOnly, UsersController.getUserById);
router.delete('/api/users/:id/delete', AuthorizationMiddleware.adminOnly, UsersController.deletetUserById);
router.patch('/api/users/roles/:id/user', AuthorizationMiddleware.adminOnly, RolesController.makeUserById);
router.patch('/api/users/roles/:id/admin', AuthorizationMiddleware.adminOnly, RolesController.makeAdminById);
router.patch('/api/users/status/:id/activate', AuthorizationMiddleware.adminOnly, UsersController.activateUserById);
router.patch('/api/users/status/:id/deactivate', AuthorizationMiddleware.adminOnly, UsersController.deactivateUserById);

// Sources
router.post("/api/sources/path/set", AuthorizationMiddleware.adminOnly, SourcesController.setPath);
router.get("/api/sources/path/get", SourcesController.getPath);
router.get("/api/sources/path/history", AuthorizationMiddleware.adminOnly, SourcesController.getPathHistory);

export default router;
