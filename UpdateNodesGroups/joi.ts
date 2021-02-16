import * as Joi from 'joi';

const updateNodesGroupsSchema: Joi.ObjectSchema = Joi.object({
    unitId: Joi.string().required(),
    fieldName: Joi.string().required(),
    removedItem: Joi.string().required(),
}).unknown();

export default updateNodesGroupsSchema;
