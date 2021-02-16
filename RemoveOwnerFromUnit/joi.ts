import * as Joi from 'joi';

const objectIdType: Joi.StringSchema = Joi.string().regex(/^[a-f\d]{24}$/i);

const removeOwnerFromUnitSchema: Joi.ObjectSchema = Joi.object({
    params: {
        id: objectIdType,
    },
    body: {
        owner: Joi.string().required(),
    },
}).unknown();

export default removeOwnerFromUnitSchema;
