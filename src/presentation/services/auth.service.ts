import { envs } from "../../config/envs";
import { LoginUserDto } from "../../domain/dtos/auth/login-user.dto";
import { CreateUserDto } from "../../domain/dtos/users/create-user.dto";
import { UpdateUserEmailValidatedDto } from "../../domain/dtos/users/update-user-email-validated.dto";
import { UserEntity } from "../../domain/entities";
import { CustomError } from "../../domain/errors/custom.error";
import { UserRepository } from "../../domain/repositories";
import { bcryptAdapter } from "../../shared/plugins/bcrypt.adapter";
import { JwtAdapter } from "../../shared/plugins/jwt.adapter";
import { EmailService } from "./email.service";

export class AuthService {
  constructor(
    private readonly repository: UserRepository,
    private readonly emailService: EmailService
  ) {}

  public async login(loginUserDto: LoginUserDto) {
    // Verify if user exists
    const user = await this.repository.getByEmail(loginUserDto.email);
    if (!user)
      throw CustomError.badRequest(
        `User with email ${loginUserDto.email} was not found`
      );
    //isMatch...bcrypt...compare(123456,hash)
    const isMatching = bcryptAdapter.compare(
      loginUserDto.password,
      user.passwordHash
    );
    if (!isMatching)
      throw CustomError.badRequest("Password is not correct. Please try again");

    const { passwordHash, ...userEntity } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({
      id: user.id,
      email: user.email,
    });
    if (!token) throw CustomError.internalServer("Error while creating JWT");
    return {
      user: userEntity,
      token: token,
    };
  }

  public async register(createUserDto: CreateUserDto) {
    const existUser = await this.repository.getByEmail(createUserDto.email);
    if (existUser) throw CustomError.badRequest("Email already exists");

    try {
      createUserDto.passwordHash = bcryptAdapter.hash(
        createUserDto.passwordHash
      );

      const user = await this.repository.create(createUserDto);

      //Confirmation email
      await this.sendEmailValidationLink(user.email);

      const { passwordHash, ...userEntity } = UserEntity.fromObject(user);
      const token = await JwtAdapter.generateToken({
        id: user.id,
      });

      return {
        user: userEntity,
        token: token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  private sendEmailValidationLink = async (email: string) => {
    const token = await JwtAdapter.generateToken({
      email,
    });

    if (!token) throw CustomError.internalServer("Error getting token");

    const link = `http://localhost:${envs.port}/api/auth/validate-email/${token}`;
    const html = `
      <h1>Validate your Email</h1>
      <p>Click on the following link to validate your email</p>
      <a href="${link}">Validate your email: ${email}</a>
      `;
    const options = {
      to: email,
      subject: "Validate your email",
      htmlBody: html,
    };

    const isSent = await this.emailService.sendEmail(options);
    if (!isSent) throw CustomError.internalServer("Error sending email");

    return true;
  };

  public validateEmail = async (token: string) => {
    const payload = await JwtAdapter.validateToken<{ email: string }>(token);
    if (!payload) throw CustomError.badRequest("Invalid token");

    const { email } = payload;
    if (!email) throw CustomError.internalServer("Email not in token");

    const user = await this.repository.getByEmail(email);
    if (!user) throw CustomError.badRequest("Email does not exist");

    const updateUserEmailValidatedDto = new UpdateUserEmailValidatedDto(
      email,
      true
    );

    await this.repository.updateEmailValidatedById(
      user.id,
      updateUserEmailValidatedDto
    );

    return true;
  };
}
