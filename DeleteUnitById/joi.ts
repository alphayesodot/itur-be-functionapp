import * as Joi from 'joi';

const objectIdType: Joi.StringSchema = Joi.string().regex(/^[a-f\d]{24}$/i);

export const deleteUnitByIdSchema: Joi.ObjectSchema = Joi.object({
    params: {
        id: objectIdType,
    },
}).unknown();

export default deleteUnitByIdSchema;
