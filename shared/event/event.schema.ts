import * as Joi from 'joi';

export const getEventSchema = Joi.object({
    params: {
        id: Joi.string().regex(/^[a-f\d]{24}$/i),
    },
}).unknown();

export const getEventsSchema = Joi.object({
    body: {
        time: Joi.date(),
    },
}).unknown();
