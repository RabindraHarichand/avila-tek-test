import { Router } from "express";
import { OrderDatasourceImpl } from "../../infrastructure/datasources/order.datasource.impl";
import { ProductDatasourceImpl } from "../../infrastructure/datasources/product.datasource.impl";
import { UserDatasourceImpl } from "../../infrastructure/datasources/user.datasource.impl";
import {
  OrderRepositoryImpl,
  UserRepositoryImpl,
  ProductRepositoryImpl,
} from "../../infrastructure/repositories";
import { OrderService } from "../services";
import { OrderController } from "./controller";

export class OrderRoutes {
  static get routes(): Router {
    const router = Router();

    const orderDatasource = new OrderDatasourceImpl();
    const orderRepository = new OrderRepositoryImpl(orderDatasource);

    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);

    const productDatasource = new ProductDatasourceImpl();
    const productRepository = new ProductRepositoryImpl(productDatasource);

    const ordersService = new OrderService(
      orderRepository,
      userRepository,
      productRepository
    );

    const ordersController = new OrderController(ordersService);

    router.get("/", ordersController.getAllOrders);
    router.get("/:id", ordersController.getOrderById);
    router.get("/user/:id", ordersController.getAllOrdersByUserId);
    router.post("/", ordersController.createOrder);
    router.delete("/:id", ordersController.deleteOrder);
    router.patch("/:id/status", ordersController.updateOrderStatus);

    return router;
  }
}
