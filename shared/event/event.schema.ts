import * as Joi from 'joi';

const objectId = Joi.string().regex(/^[a-f\d]{24}$/i);

export const getEventSchema = Joi.object({
    params: {
        id: objectId.required(),
    },
}).unknown();

export const getEventsSchema = Joi.object({
    body: {
        date: Joi.date().required(),
        interviewerId: objectId.required(),
    },
}).unknown();
