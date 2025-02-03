import { Router } from "express";
import { ProductDatasourceImpl } from "../../infrastructure/datasources/product.datasource.impl";
import { ProductRepositoryImpl } from "../../infrastructure/repositories";
import { ProductService } from "../services";
import { ProductController } from "./controller";

export class ProductRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new ProductDatasourceImpl();
    const productRepository = new ProductRepositoryImpl(datasource);

    const productsService = new ProductService(productRepository);
    const productsController = new ProductController(productsService);

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
