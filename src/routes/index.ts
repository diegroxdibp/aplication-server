import { Router } from "express";
import CommentsController from "../controllers/comments.controller";
import AppController from "../controllers/app.controller";
import FirstnameController from "../controllers/firstname.controller";
import LastnameController from "../controllers/lastname.controller";

const router = Router();

router.get("/", AppController.welcome);

// Names
router.get("/api/names/jap/firstname", FirstnameController.randomFirstname);
router.get("/api/names/jap/lastname", LastnameController.randomLastname);
router.get("/api/names/jap/firstname/all", FirstnameController.allFirstnames);
router.get("/api/names/jap/lastname/all", LastnameController.allLastnames);
router.get("/api/names/jap/firstname/search/:firstname", FirstnameController.getFirstname);
router.get("/api/names/jap/lastname/search/:lastname", LastnameController.getLastname);
router.post("/api/names/jap/firstname/add", FirstnameController.addFirstname);
router.post("/api/names/jap/lastname/add", LastnameController.addLastname);

// Comments
router.get("/api/names/jap/comments/all", CommentsController.getAllComments);
router.post("/api/names/jap/comments/add", CommentsController.addComment);
router.delete("/api/names/jap/comments/remove/:comment_id", CommentsController.removeComment);

// Auth
// router.post("/api/auth/login", AuthController.login);
// router.post("/api/auth/register", AuthController.signUp);

// // Logs
// router.get("/api/logs/login", LoggerController.loginLogs);

// // Users
// router.get("/api/users", UsersController.getAll);
// router.get("/api/users/id/:id", UsersController.getUserById);
// router.get(
//   "/api/logs",
//   AuthorizationMiddleware.adminOnly,
//   UsersController.getUserById
// );
// router.get("/api/users/email/:email", UsersController.getUserByEmail);
// router.delete(
//   "/api/users/:id/delete",
//   AuthorizationMiddleware.adminOnly,
//   UsersController.deletetUserById
// );
// router.patch(
//   "/api/users/roles/:id/user",
//   AuthorizationMiddleware.adminOnly,
//   rolesController.makeUserById
// );
// router.patch(
//   "/api/users/roles/:id/admin",
//   AuthorizationMiddleware.adminOnly,
//   rolesController.makeAdminById
// );
// router.post(
//   "/api/sources/path/set",
//   AuthorizationMiddleware.adminOnly,
//   sourcesController.setPath
// );
// router.get("/api/sources/path/get", sourcesController.getPath);
// router.get(
//   "/api/sources/path/history",
//   AuthorizationMiddleware.adminOnly,
//   sourcesController.getPathHistory
// );

export default router;
