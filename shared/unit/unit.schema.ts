import * as Joi from 'joi';

const objectIdType = Joi.string().regex(/^[a-f\d]{24}$/i);

export const getUnitByIdSchema = Joi.object({
    params: {
        id: objectIdType,
    },
}).unknown();

export const deleteUnitByIdSchema = Joi.object({
    params: {
        id: objectIdType,
    },
}).unknown();

export const createUnitSchema = Joi.object({
    body: {
        name: Joi.string().required(),
        nodes: Joi.array().items(Joi.string()).required(),
        owners: Joi.array().items(objectIdType).required(),
        interviewers: Joi.array().items(objectIdType),
    },
}).unknown();

export const updateUnitSchema = Joi.object({
    params: {
        id: objectIdType,
    },
    body: {
        name: Joi.string(),
        nodes: Joi.array().items(Joi.string()),
        owners: Joi.array().items(objectIdType),
        interviewers: Joi.array().items(objectIdType),
    },
}).unknown();
