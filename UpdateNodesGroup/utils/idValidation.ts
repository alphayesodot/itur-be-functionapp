import * as Joi from 'joi';

const reqValidation = Joi.object({
    params: {
        nodesGroupId: Joi.string().regex(/^[a-f\d]{24}$/i),
    },
}).unknown();

export default reqValidation;
