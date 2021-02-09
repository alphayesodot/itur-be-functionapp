import * as Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const getUnitSchema = Joi.object({
    params: {
        id: Joi.string().regex(/^[a-f\d]{24}$/i),
    },
}).unknown();
