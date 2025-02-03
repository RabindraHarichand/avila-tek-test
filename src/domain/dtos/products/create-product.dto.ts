export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly description: string,
    public readonly quantity: number
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateProductDto?] {
    const { name, price, description, quantity } = props;
    if (!name) return ["Missing name"];
    if (typeof name !== "string") return ["name must be a string"];

    if (!price) return ["Missing price"];
    if (isNaN(price)) return ["price must be a valid number"];
    if (typeof price !== "number") return ["price must be a valid number"];
    if (price < 0) return ["price must be a positive number"];

    if (!description) return ["Missing description"];
    if (typeof description !== "string")
      return ["description must be a string"];

    if (!quantity) return ["Missing quantity"];
    if (isNaN(quantity)) return ["quantity must be a valid number"];
    if (typeof quantity !== "number")
      return ["quantity must be a valid number"];
    if (!Number.isInteger(quantity)) return ["quantity must be an integer"];
    if (quantity < 0) return ["quantity must be a positive number"];

    return [
      undefined,
      new CreateProductDto(name, price, description, quantity),
    ];
  }
}
