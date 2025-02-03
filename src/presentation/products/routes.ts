import { Router } from "express";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/", () => {});
    router.get("/:id", () => {});
    router.post("/", () => {});
    router.put("/:id", () => {});
    router.delete("/:id", () => {});
    router.patch("/:id/quantity", () => {});
    router.patch("/:id/price", () => {});

    return router;
  }
}
