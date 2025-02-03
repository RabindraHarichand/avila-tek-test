export class UpdateProductPriceDto {
  private constructor(public readonly price: number) {}

  static create(props: {
    [key: string]: any;
  }): [string?, UpdateProductPriceDto?] {
    const { price } = props;

    if (!price) return ["Missing price"];
    if (isNaN(price)) return ["price must be a valid number"];
    if (typeof price !== "number") return ["price must be a valid number"];
    if (price < 0) return ["price must be a positive number"];

    return [undefined, new UpdateProductPriceDto(price)];
  }
}
