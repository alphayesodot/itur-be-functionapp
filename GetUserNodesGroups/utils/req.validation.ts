import * as Joi from 'joi';

const reqValidation = Joi.object({
    // params: {
    // userId: Joi.string().regex(/^[a-f\d]{24}$/i),
    userId: Joi.string(),
    // },
});

export default reqValidation;
