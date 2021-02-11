import * as Joi from 'joi';
import Status from './status.enum';

const validEvent = Joi.object({
    nodeId: Joi.string().required(),
    malshabId: Joi.string().required(),
    time: Joi.date().required(),
    location: Joi.string().required(),
    status: Joi.string().required(), // TODO: .valid(statuses)
    url: Joi.string(),
});

export default validEvent;
