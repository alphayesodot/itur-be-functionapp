import * as Joi from 'joi';

const objectIdType: Joi.StringSchema = Joi.string().regex(/^[a-f\d]{24}$/i);

export const updateUnitSchema: Joi.ObjectSchema = Joi.object({
    params: {
        id: objectIdType,
    },
    body: {
        name: Joi.string(),
    },
}).unknown();

export default updateUnitSchema;
