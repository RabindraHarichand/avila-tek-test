import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { PaginationDto } from "../../shared/dtos/pagination.dto";
import { CreateOrderDto } from "../../domain/dtos/orders/create-order-dto";
import { UpdateOrderDto } from "../../domain/dtos/orders/update-order-dto";
import { AuthUserDto } from "../../domain/dtos/auth/auth-user.dto";
import { OrderService } from "../services/order.service";

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

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

    this.orderService
      .getAllOrders(paginationDto!)
      .then((orders) => res.json(orders))
      .catch((error) => this.handleError(error, res));
  };

  public getOrderById = async (req: Request, res: Response): Promise<any> => {
    const id = +req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });

    this.orderService
      .getOrderById(id)
      .then((orders) => res.json(orders))
      .catch((error) => this.handleError(error, res));
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

    this.orderService
      .getAllOrdersByUserId(id, paginationDto!)
      .then((orders) => res.json(orders))
      .catch((error) => this.handleError(error, res));
  };

  public createOrder = async (req: Request, res: Response): Promise<any> => {
    const [error, createOrderDto] = CreateOrderDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const [authError, authUserDto] = AuthUserDto.create(req.body);
    if (authError) return res.status(400).json({ error: authError });

    this.orderService
      .createOrder(createOrderDto!, authUserDto!)
      .then((orders) => res.json(orders))
      .catch((error) => this.handleError(error, res));
  };

  public deleteOrder = async (req: Request, res: Response): Promise<any> => {
    const id = +req.params.id;
    if (!id) return res.status(400).json({ error: "Missing id" });

    this.orderService
      .deleteOrder(id)
      .then((orders) => res.json(orders))
      .catch((error) => this.handleError(error, res));
  };
  public updateOrderStatus = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const id = +req.params.id;
    const [error, updateOrderDto] = UpdateOrderDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.orderService
      .updateOrderStatus(id, updateOrderDto!)
      .then((orders) => res.json(orders))
      .catch((error) => this.handleError(error, res));
  };
}
