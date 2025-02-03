import { Router } from "express";
import { AuthController } from "./controller";
import { envs } from "../../config/envs";
import { UserDatasourceImpl } from "../../infrastructure/datasources/user.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories";
import { EmailService, AuthService } from "../services";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const emailService = new EmailService(
      envs.mailer_service,
      envs.mailer_email,
      envs.mailer_secret_key,
      envs.send_email
    );

    const userDatasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(userDatasource);

    const authService = new AuthService(userRepository, emailService);

    const authController = new AuthController(authService);

    router.post("/login", authController.login);
    router.post("/register", authController.register);
    router.get("/validate-email/:token", authController.validateEmail);

    return router;
  }
}
