import * as Joi from 'joi';

const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  API_PORT: Joi.number().default(3000),
  API_HOST: Joi.string().default('127.0.0.1'),
  API_PREFIX: Joi.string().default('api'),
  // DATABASE_URL: Joi.string().required(),
});

export default configSchema;
