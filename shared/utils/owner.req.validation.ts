import * as Joi from 'joi';

const reqValidation = Joi.object({
    params: {
        id: Joi.string().regex(/^[a-f\d]{24}$/i),
    },
    body: {
        ownerId: Joi.string().regex(/^[a-f\d]{24}$/i),
    },
}).unknown();

export default reqValidation;
