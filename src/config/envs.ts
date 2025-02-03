import "dotenv/config";
import * as joi from "joi";

interface EnvVars {
  PORT: number;
  JWT_SECRET: string;

  SEND_EMAIL: boolean;
  MAILER_SERVICE: string;
  MAILER_EMAIL: string;
  MAILER_SECRET_KEY: string;
  WEBSERVICE_URL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    JWT_SECRET: joi.string().required(),

    SEND_EMAIL: joi.boolean().required(),
    MAILER_SERVICE: joi.string().required(),
    MAILER_EMAIL: joi.string().required(),
    MAILER_SECRET_KEY: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  jwt_seed: envVars.JWT_SECRET,

  send_email: envVars.SEND_EMAIL,
  mailer_service: envVars.MAILER_SERVICE,
  mailer_email: envVars.MAILER_EMAIL,
  mailer_secret_key: envVars.MAILER_SECRET_KEY,
};
