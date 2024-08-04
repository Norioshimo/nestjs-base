import * as Joi from 'joi';


export const JoiValidationSchema = Joi.object({
    DB_HOST: Joi.required(),
    DB_PORT: Joi.number().default(3001),
    BD_NAME: Joi.required(),
    DB_USERNAME: Joi.required(),
    DB_PASSWORD: Joi.required(),
    DEFAULT_LIMIT: Joi.number().default(10),
    JWT_SECRET:Joi.required(),
    SYNCHRONIZE_TYPEORM:Joi.bool().required()
})



