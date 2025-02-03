import { Router } from "express";
import { UserController } from "./controller";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const usersController = new UserController();

    router.get("/", usersController.getAllUsers);
    router.get("/:id", usersController.getUserById);
    router.post("/", usersController.createUser);
    router.put("/:id", usersController.updateUser);
    router.delete("/:id", usersController.deleteUser);

    return router;
  }
}
