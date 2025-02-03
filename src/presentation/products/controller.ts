import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { PaginationDto } from "../../shared/dtos/pagination.dto";
import { CreateProductDto } from "../../domain/dtos/products/create-product.dto";
import { UpdateProductQuantityDto } from "../../domain/dtos/products/update-product-quantity.dto";
import { UpdateProductPriceDto } from "../../domain/dtos/products/update-product-price.dto";
import { UpdateProductDto } from "../../domain/dtos/products/update-product.dto";

export class ProductsController {
  constructor() {}
  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(`${error}`);

    return res.status(500).json({ error: "Internal server error" });
  };

  public getAllProducts = async (req: Request, res: Response): Promise<any> => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });
  };

  public getProductById = async (req: Request, res: Response): Promise<any> => {
    const id = +req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });
  };

  public createProduct = async (req: Request, res: Response): Promise<any> => {
    const [error, createProductDto] = CreateProductDto.create(req.body);
    if (error) return res.status(400).json({ error });
  };

  public updateProduct = async (req: Request, res: Response): Promise<any> => {
    const id = +req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });

    const [error, updateProductDto] = UpdateProductDto.create(req.body);
    if (error) return res.status(400).json({ error });
  };

  public deleteProduct = async (req: Request, res: Response): Promise<any> => {
    const id = +req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });
  };

  public updateProductQuantity = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const id = +req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });

    const [error, updateProductQuantityDto] = UpdateProductQuantityDto.create(
      req.body
    );

    if (error) return res.status(400).json({ error });
  };

  public updateProductPrice = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const id = +req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });

    const [error, updateProductPriceDto] = UpdateProductPriceDto.create(
      req.body
    );

    if (error) return res.status(400).json({ error });
  };
}
