import * as Joi from 'joi';

const reqIdValidation = Joi.object({
    params: {
        id: Joi.string().regex(/^[a-f\d]{24}$/i),
    },
}).unknown();

export default reqIdValidation;
