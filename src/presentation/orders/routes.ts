import { Router } from "express";
import { OrderController } from "./controller";

export class OrderRoutes {
  static get routes(): Router {
    const router = Router();

    const ordersController = new OrderController();

    router.get("/", ordersController.getAllOrders);
    router.get("/:id", ordersController.getOrderById);
    router.get("/user/:id", ordersController.getAllOrdersByUserId);
    router.post("/", ordersController.createOrder);
    router.delete("/:id", ordersController.deleteOrder);
    router.patch("/:id/status", ordersController.updateOrderStatus);

    return router;
  }
}
