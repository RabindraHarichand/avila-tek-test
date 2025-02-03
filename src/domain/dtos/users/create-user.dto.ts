import { regularExps } from "../../../shared/regular-expressions/regular-exp";
import { UserRole, userRole } from "../../../shared/types/user.type";

export class CreateUserDto {
  private constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string,
    public passwordHash: string,
    public readonly role: UserRole
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateUserDto?] {
    const { firstName, lastName, email, password, role = "User" } = props;

    if (!firstName) return ["Missing firstName"];

    if (!lastName) return ["Missing lastName"];

    if (!password) return ["Missing password"];
    if (password < 6) return ["Password too short"];

    if (!email) return ["Missing email"];
    if (!regularExps.email.test(email)) return ["Email is not valid"];

    if (!role) return ["Missing role"];
    if (!userRole.includes(role))
      return [`Invalid role. Valid roles are ${userRole}`];

    return [
      undefined,
      new CreateUserDto(firstName, lastName, email, password, role),
    ];
  }
}
