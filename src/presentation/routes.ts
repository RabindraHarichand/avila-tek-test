import { Router } from "express";
export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.use("/api/users", () => {});
    router.use("/api/orders", () => {});
    router.use("/api/products", () => {});
    router.use("/api/auth", () => {});

    return router;
  }
}
