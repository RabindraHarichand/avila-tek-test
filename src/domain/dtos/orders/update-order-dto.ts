import {
  OrderStatus,
  orderStatus,
} from "../../../shared/types/order-status.type";

export class UpdateOrderDto {
  constructor(public readonly status: OrderStatus) {}

  static create(props: { [key: string]: any }): [string?, UpdateOrderDto?] {
    const { status } = props;

    if (!status) return ["Missing status"];
    if (!orderStatus.includes(status))
      return [`Invalid status: ${status}. Valid statuses are: ${orderStatus}`];

    return [undefined, new UpdateOrderDto(status)];
  }
}
