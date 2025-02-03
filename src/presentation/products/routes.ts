import { Router } from "express";
import { ProductController } from "./controller";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const productsController = new ProductController();

    router.get("/", productsController.getAllProducts);
    router.get("/:id", productsController.getProductById);
    router.post("/", productsController.createProduct);
    router.put("/:id", productsController.updateProduct);
    router.delete("/:id", productsController.deleteProduct);
    router.patch("/:id/quantity", productsController.updateProductQuantity);
    router.patch("/:id/price", productsController.updateProductPrice);

    return router;
  }
}
