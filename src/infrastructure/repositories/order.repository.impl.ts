import { OrderDatasource } from "../../domain/datasources";
import { UpdateOrderDto } from "../../domain/dtos/orders/update-order-dto";
import { OrderEntity } from "../../domain/entities";
import { OrderRepository } from "../../domain/repositories";
import { PaginationDto } from "../../shared/dtos/pagination.dto";

export class OrderRepositoryImpl implements OrderRepository {
  constructor(private readonly datasource: OrderDatasource) {}
  count(): Promise<number> {
    return this.datasource.count();
  }

  countByUserId(id: number): Promise<number> {
    return this.datasource.countByUserId(id);
  }

  existsById(id: number): Promise<boolean> {
    return this.datasource.existsById(id);
  }

  create(order: Omit<OrderEntity, "id">): Promise<OrderEntity> {
    return this.datasource.create(order);
  }

  getAll(paginationDto: PaginationDto): Promise<OrderEntity[]> {
    return this.datasource.getAll(paginationDto);
  }

  getAllByUserId(
    id: number,
    paginationDto: PaginationDto
  ): Promise<OrderEntity[]> {
    return this.datasource.getAllByUserId(id, paginationDto);
  }

  findById(id: number): Promise<OrderEntity | null> {
    return this.datasource.findById(id);
  }

  updateById(id: number, updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {
    return this.datasource.updateById(id, updateOrderDto);
  }

  deleteById(id: number): Promise<string> {
    return this.datasource.deleteById(id);
  }
}
