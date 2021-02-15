import * as Joi from 'joi';

const objectIdType: Joi.StringSchema = Joi.string().regex(/^[a-f\d]{24}$/i);

const addNodeToUnitSchema: Joi.ObjectSchema = Joi.object({
    params: {
        id: objectIdType,
    },
    body: {
        node: Joi.string().required(),
    },
}).unknown();

export default addNodeToUnitSchema;
