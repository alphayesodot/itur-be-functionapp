import * as Joi from 'joi';

const objectIdType: Joi.StringSchema = Joi.string().regex(/^[a-f\d]{24}$/i);

export const createUnitSchema: Joi.ObjectSchema = Joi.object({
    body: {
        name: Joi.string().required(),
        nodes: Joi.array().items(Joi.string()).unique().required(),
        owners: Joi.array().items(objectIdType).unique().required(),
        interviewers: Joi.array().items(objectIdType).unique(),
    },
}).unknown();

export default createUnitSchema;
