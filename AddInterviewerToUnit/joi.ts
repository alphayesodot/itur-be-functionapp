import * as Joi from 'joi';

const objectIdType: Joi.StringSchema = Joi.string().regex(/^[a-f\d]{24}$/i);

const addInterviewerToUnitSchema: Joi.ObjectSchema = Joi.object({
    params: {
        id: objectIdType,
    },
    body: {
        interviewer: Joi.string().required(),
    },
}).unknown();

export default addInterviewerToUnitSchema;
