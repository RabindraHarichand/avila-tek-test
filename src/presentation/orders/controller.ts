import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { PaginationDto } from "../../shared/dtos/pagination.dto";
import { CreateOrderDto } from "../../domain/dtos/orders/create-order-dto";
import { UpdateOrderDto } from "../../domain/dtos/orders/update-order-dto";
import { AuthUserDto } from "../../domain/dtos/auth/auth-user.dto";

export class OrderController {
  constructor() {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(`${error}`);

    return res.status(500).json({ error: "Internal server error" });
  };

  public getAllOrders = async (req: Request, res: Response): Promise<any> => {
    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });
  };

  public getOrderById = async (req: Request, res: Response): Promise<any> => {
    const id = +req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });
  };

  public getAllOrdersByUserId = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const id = +req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });

    const { page = 1, limit = 10 } = req.query;
    const [error, paginationDto] = PaginationDto.create(+page, +limit);
    if (error) return res.status(400).json({ error });
  };

  public createOrder = async (req: Request, res: Response): Promise<any> => {
    const [error, createOrderDto] = CreateOrderDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const [authError, authUserDto] = AuthUserDto.create(req.body);
    if (authError) return res.status(400).json({ error: authError });
  };

  public deleteOrder = async (req: Request, res: Response): Promise<any> => {
    const id = +req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });
  };
  public updateOrderStatus = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const id = +req.params.id;
    const [error, updateOrderDto] = UpdateOrderDto.create(req.body);
    if (error) return res.status(400).json({ error });
  };
}
