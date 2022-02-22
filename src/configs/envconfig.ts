import Joi from '@hapi/joi';
import { ConfigModuleOptions } from '@nestjs/config';

const config: ConfigModuleOptions = {
  validationSchema: Joi.object({
    PORT: Joi.number(),
    HOST: Joi.string(),

    DB_HOST: Joi.string(),
    DB_PORT: Joi.number(),
    DB_USERNAME: Joi.string(),
    DB_DATABASE: Joi.string(),
    DB_PASSWORD: Joi.string(),
  }),
};

export = config;
