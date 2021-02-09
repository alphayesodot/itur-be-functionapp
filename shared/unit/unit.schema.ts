import * as Joi from 'joi';

export const getUnitByIdSchema = Joi.object({
    params: {
        id: Joi.string().regex(/^[a-f\d]{24}$/i),
    },
}).unknown();

export const deleteUnitByIdSchema = Joi.object({
    params: {
        id: Joi.string().regex(/^[a-f\d]{24}$/i),
    },
}).unknown();
