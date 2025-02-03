import { Router } from "express";

export class OrderRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", () => {});
    router.get("/:id", () => {});
    router.get("/user/:id", () => {});
    router.post("/", () => {});
    router.delete("/:id", () => {});
    router.patch("/:id/status", () => {});

    return router;
  }
}
