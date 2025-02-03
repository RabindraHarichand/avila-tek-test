interface Product {
  id: number;
  quantity: number;
}

export class CreateOrderDto {
  private constructor(
    public readonly products: {
      id: number;
      quantity: number;
    }[]
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateOrderDto?] {
    const { products } = props;

    if (!products) return ["Missing products"];
    if (!Array.isArray(products)) return ["products must be an array"];

    try {
      products.map((product: Product) => {
        if (!product.id) return ["Missing id"];
        if (isNaN(+product.id)) return ["id must be a number"];
        if (typeof product.id !== "number")
          return ["id must be a valid number"];
        if (+product.id < 0 || !Number.isInteger(product.id))
          return ["invalid id"];

        if (!product.quantity) return ["Missing quantity"];
        if (isNaN(product.quantity)) return ["quantity must be a valid number"];
        if (typeof product.quantity !== "number")
          return ["quantity must be a valid number"];
        if (!Number.isInteger(product.quantity))
          return ["quantity must be a valid number"];
        if (product.quantity < 0) return ["quantity must be a positive number"];
      });

      return [undefined, new CreateOrderDto(products)];
    } catch (error) {
      return ["Failure to create Order. Due to validation issues"];
    }
  }
}
