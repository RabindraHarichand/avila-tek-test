export class UpdateProductQuantityDto {
  private constructor(public readonly quantity: number) {}

  static create(props: {
    [key: string]: any;
  }): [string?, UpdateProductQuantityDto?] {
    const { quantity } = props;
    if (!quantity) return ["Missing quantity"];
    if (isNaN(quantity)) return ["quantity must be a valid number"];

    if (typeof quantity !== "number")
      return ["quantity must be a valid number"];
    if (!Number.isInteger(quantity)) return ["quantity must be a valid number"];
    if (quantity < 0) return ["quantity must be a positive number"];

    return [undefined, new UpdateProductQuantityDto(quantity)];
  }
}
