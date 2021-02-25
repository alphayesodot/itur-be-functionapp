import * as Joi from 'joi';

export const createUnitSchema: Joi.ObjectSchema = Joi.object({
    body: {
        name: Joi.string().required(),
    },
}).unknown();

export default createUnitSchema;
