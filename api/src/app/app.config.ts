import * as Joi from 'joi';

const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  API_PORT: Joi.number().default(3000),
  API_HOST: Joi.string().default('127.0.0.1'),
  API_PREFIX: Joi.string().default('api'),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().positive().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_DATABASE: Joi.string().required(),
  POSTGRES_LOGGING: Joi.boolean().default(false),
});

export default configSchema;
