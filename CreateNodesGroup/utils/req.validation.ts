import * as Joi from 'joi';

const nodesGroupValidation = Joi.object({
    owners: Joi.array().items(Joi.string()).required(),
    interviewers: Joi.array().items(Joi.string()).required(),
    nodes: Joi.array().items(Joi.string()).required(),
    unit: Joi.string().required(),
});

export default nodesGroupValidation;
