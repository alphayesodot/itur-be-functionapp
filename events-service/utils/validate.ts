import * as Joi from 'joi';

const validEvent = Joi.object({
    nodeId: Joi.string().required(),
    malshabId: Joi.string().required(),
    time: Joi.date().required(),
    location: Joi.string().required(),
    status: Joi.string(), // TODO: .valid(statuses)
    url: Joi.string(),
});

export default validEvent;
